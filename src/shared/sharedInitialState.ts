/**
 * shared initial state
 */
export interface UserInfo {
  id: string
  token: string
  avatar_url: string
  loginname: string
}
export type ExtralState = {
  html?: {
    title?: string
    description?: string
    keywords?: string
  }
  pageTitle: string
  showMenu: boolean
  fixedHeader: boolean
  showAddButton: boolean
  messageCount: number
  alertText: string
  loadingText: string
  userInfo: UserInfo | null
  isLogin?: boolean
}

const sharedInitialState: ExtralState = {
  // html config
  html: {
    title: "isomorphic-cnode",
    description: "an example of react-imvc usage",
    keywords: "react ssr isomorphic mvc"
  },
  // 页面类型：首页，列表页，详情页等
  pageTitle: "",
  // 用户信息
  userInfo: null,
  // 展示菜单
  showMenu: false,
  // 固定头部
  fixedHeader: true,
  // 菜单里显示添加按钮
  showAddButton: false,
  // 消息数量
  messageCount: 0,
  // 提示信息
  alertText: "",
  // laoding 话术
  loadingText: ""
};

export default sharedInitialState