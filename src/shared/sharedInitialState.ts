/**
 * shared initial state
 */
import { BaseState } from 'react-imvc'
export interface Message {
  id: string,
  author: {
    avatar_url: string,
    loginname: string
  },
  title?: string,
  last_reply_at?: number
}

export interface Reply extends Message {
  author: {
    avatar_url: string
    loginname: string
  }
  id: string
  isUps?: boolean,
  ups: string[],
  create_at: number,
  content: string
}
export interface Topic extends Message {
  tab: string
  good: string
  top: string
  author: {
    avatar_url: string
    loginname: string
  }
  create_at: string
  visit_count: number
  title: string
  content: string
  reply_count: number
  replies: Reply[]
}
export interface UserInfo {
  id: string
  token: string
  avatar_url: string
  loginname: string
  create_at: number
  recent_replies: Reply[]
  recent_topics: Topic[],
  score: number
}
export type ExtraState = BaseState & {
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

const sharedInitialState = {
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
}

export default sharedInitialState