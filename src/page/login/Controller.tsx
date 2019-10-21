import React from "react"
import { ViewProps } from 'react-imvc'
import { Input } from "react-imvc/component"
import Layout from "../../component/Layout"
import Controller from "../../shared/BaseController"
import { ExtraState } from '../../shared/sharedInitialState'

export type State = ExtraState & {
  pageTitle: string
  token: string
}

const initialState = {
  pageTitle: "登录",
  token: ""
}

class Login extends Controller<State, {}> {
  View = View
  initialState = initialState

  async shouldComponentCreate() {
    let { context, location } = this
    // 如果已经登陆，重定向离开
    if (this.isLogin()) {
      let { userInfo } = context
      let targetPath = (location.query && location.query.redirect as string) || ''
      if (!targetPath) {
        targetPath = `${context.basename}/user/${userInfo && userInfo.loginname}`
      }
      this.redirect(targetPath)
      return false
    }
  }

  handleLogin = async () => {
    let { token } = this.store.getState()

    if (!token || token.length !== 36) {
      this.showAlert("令牌格式错误, 应为36位UUID字符串")
      return
    }

    this.showLoading("登录中……")

    try {
      let userInfo = await this.fetchUserInfo(token)

      if (!userInfo) {
        throw new Error("登陆失败，请重试")
      }

      this.cookie("accesstoken", token)
      window.location.reload()
    } catch (error) {
      this.showAlert(error.message)
    }

    this.hideLoading()
  }
}

export default Login

export interface Ctrl {
  handleLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function View({ ctrl }: ViewProps<State, Ctrl>) {
  let { handleLogin } = ctrl

  return (
    <Layout>
      <section className="page-body">
        <div className="label">
          <Input
            name="token"
            className="txt"
            type="text"
            placeholder="Access Token"
            maxLength="36"
          />
        </div>
        <div className="label">
          <button className="button" onClick={handleLogin}>
            登录
          </button>
        </div>
      </section>
    </Layout>
  )
}
