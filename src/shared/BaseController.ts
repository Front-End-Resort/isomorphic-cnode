// base controller class
import Controller from "react-imvc/controller";
import { Actions, BaseState } from 'react-imvc'
import querystring from "querystring";
import sharedInitialState, { ExtralState } from "./sharedInitialState";
import * as sharedActions from "./sharedActions";

export type ExtralActions = typeof sharedActions

export default class<S extends object, AS extends Actions<S & BaseState>> extends Controller<S, AS, ExtralState, ExtralActions> {
  SSR = true
  preload = {
    main: "/css/main.css"
  }

  async getInitialState<S>(initialState: S) {
    let userInfo = await this.getUserInfo();
    let isLogin = this.isLogin();
    let showAddButton = isLogin;

    return {
      ...sharedInitialState,
      showAddButton,
      userInfo,
      isLogin,
      ...initialState
    };
  }

  /**
     * 动态合并共享的 actions
     */
  getFinalActions<AS>(actions: AS) {
    return {
      ...actions,
      ...sharedActions
    };
  }

  /**
   * 数据重用后，将服务端的 userInfo 存入 context 里给其他页面使用
   */
  stateDidReuse(state: S & ExtralState & BaseState) {
    if (state.userInfo) {
      this.context.userInfo = state.userInfo;
    }
  }

  // 拓展字段：是否需要登录才可以访问
  NeedLogin = false;
  async shouldComponentCreate() {
    // 如果需要登录却没登录，去登录页
    if (this.NeedLogin && !this.isLogin()) {
      this.redirect(`/login?redirect=${this.location.raw}`);
      return false;
    }
  }

  pageWillLeave() {
    this.showLoading("加载中……");
  }

  pageDidBack() {
    this.hideLoading();
  }

  async getUserInfo() {
    let { context } = this;
    // 获取登录用户信息，将用户信息缓存在 context 里，所有页面都可以共享访问
    let userInfo = null;

    try {
      if (context.hasOwnProperty("userInfo")) {
        userInfo = context.userInfo;
      } else {
        let accesstoken = this.cookie("accesstoken");
        userInfo = await this.fetchUserInfo(accesstoken);
        context.userInfo = userInfo;
      }
    } catch (_) {
      context.userInfo = undefined;
    }

    return userInfo;
  }

  async fetchUserInfo(accesstoken: string) {
    if (!accesstoken) {
      return null;
    }

    let data = await this.post("/accesstoken", { accesstoken });
    let { success, error_msg, ...userInfo } = data;
    return userInfo;
  }

  // 判断是否登录
  isLogin() {
    return !!this.context.userInfo;
  }

  // 封装 get 方法，处理 cnode 跨域要求
  get(
    api: string,
    params?: Record<string, string | number | boolean>,
    options?: RequestInit & {
      raw?: boolean
      json?: boolean
      timeout?: number
      timeoutErrorFormatter?: ((opstion: any) => string) | string
    }
  ) {
    options = {
      ...options,
      credentials: "omit",
      headers: {
        ...(options && options.headers),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    return super.get(api, params, options);
  }

  // 封装 post 方法，处理 cnode 跨域要求
  post(
    api: string,
    data?: any,
    options?: RequestInit & {
      raw?: boolean
      json?: boolean
      timeout?: number
      timeoutErrorFormatter?: ((opstion: any) => string) | string
    }) {
    options = {
      ...options,
      credentials: "omit",
      method: "POST",
      headers: {
        ...(options && options.headers),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: querystring.stringify(data)
    };
    return this.fetch(api, options);
  }

  // 统一抛错, get/post 方法底层调用的是 fetch 方法
  async fetch(
    url: string,
    options: RequestInit & {
      raw?: boolean
      json?: boolean
      timeout?: number
      timeoutErrorFormatter?: ((opstion: any) => string) | string
    } = {}
  ) {
    let data = await super.fetch(url, options);
    let { success, error_msg, ...userInfo } = data;

    if (!success) {
      throw new Error(error_msg);
    }
    return data;
  }

  // 隐藏提示信息
  hideAlert = () => {
    let { UPDATE_ALERT_TEXT } = this.store.actions;
    UPDATE_ALERT_TEXT("");
  };

  // 显示提示信息
  showAlert = (text: string) => {
    let { UPDATE_ALERT_TEXT } = this.store.actions;
    UPDATE_ALERT_TEXT(text);
    setTimeout(this.hideAlert, 1000);
  };

  showLoading = (content: string) => {
    let { UPDATE_LOADING_TEXT } = this.store.actions;
    UPDATE_LOADING_TEXT(content);
  };

  hideLoading = () => {
    let { UPDATE_LOADING_TEXT } = this.store.actions;
    UPDATE_LOADING_TEXT("");
  };

  // 打开菜单
  handleOpenMenu = () => {
    let { OPEN_MENU } = this.store.actions;
    OPEN_MENU();
  };

  // 关闭菜单
  handleCloseMenu = () => {
    let { CLOSE_MENU } = this.store.actions;
    CLOSE_MENU();
  };

  // 退出登陆
  handleLogout = () => {
    this.removeCookie("accesstoken");
    window.location.reload();
  };
}
