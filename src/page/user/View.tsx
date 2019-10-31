import React from "react"
import classnames from "classnames"
import { Link } from "react-imvc/component"
import Layout from "../../component/Layout"
import { getLastTimeStr } from "../../shared/util"
import { UserInfo, Message } from "../../shared/sharedInitialState"
import { TYPE, State } from './Model'
import Ctrl from './Controller'

export type ViewProps = {
  state: State,
  ctrl: Ctrl
}

export default function View({ state, ctrl }: ViewProps) {
  let { user, type } = state
  let key = `recent_${type}` as keyof UserInfo

  if (!user) return <div></div>

  let currentData = user[key] || []
  return (
    <Layout>
      <UserInfoComponent user={user} />
      <UserTopics
        type={type}
        currentData={currentData as Message[]}
        onChange={ctrl.handleTypeChange}
      />
    </Layout>
  )
}

export interface UserInfoProps {
  user: UserInfo
}

function UserInfoComponent({ user }: UserInfoProps) {
  return (
    <section className="userinfo">
      <img className="u-img" src={user.avatar_url} />
      <br />
      <span className="u-name">{user.loginname}</span>
      <div className="u-bottom">
        <span className="u-time">{getLastTimeStr(user.create_at.toString(), false)}</span>
        <span className="u-score">积分：{user.score}</span>
      </div>
    </section>
  )
}

export interface UserTopicsProps {
  currentData: Message[]
  type: TYPE,
  onChange: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

function UserTopics({ currentData, type, onChange }: UserTopicsProps) {
  return (
    <section className="topics">
      <ul className="user-tabs">
        <TabItem
          type={"replies"}
          selected={type === "replies"}
          onChange={onChange}
        >
          最近回复
        </TabItem>
        <TabItem
          type={"topics"}
          selected={type === "topics"}
          onChange={onChange}
        >
          最新发布
        </TabItem>
      </ul>
      <MessageList list={currentData} />
    </section>
  )
}

export interface TabItem {
  type: TYPE,
  selected: boolean,
  onChange: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

function TabItem({ type, selected, children, onChange }: React.PropsWithChildren<TabItem>) {
  let className = classnames({
    item: true,
    br: true,
    selected
  })
  return (
    <li className={className} data-type={type} onClick={onChange}>
      {children}
    </li>
  )
}

export interface MessageListProps {
  list: Message[]
}

function MessageList({ list }: MessageListProps) {
  if (!list || list.length === 0) {
    return (
      <div className="no-data">
        <i className="iconfont icon-empty">&#xe60a</i>
        暂无数据!
      </div>
    )
  }

  return (
    <div>{list.map(message => <MessageComponent {...message} key={message.id} />)}</div>
  )
}


function MessageComponent(props: Message) {
  let { id, title, author, last_reply_at } = props
  return (
    <div className="message markdown-body">
      <section className="user">
        <Link
          as="img"
          className="head"
          src={author.avatar_url}
          to={`/user/${author.loginname}`}
        />
        <Link as="div" to={`/topic/${id}`} style={{ 'width': '100%' }}>
          <div className="t-title">{title}</div>
          <span className="cl">
            <span className="name">{author.loginname}</span>
          </span>
          <span className="cr">
            <span className="name">{getLastTimeStr(last_reply_at ? last_reply_at.toString() : '', true)}</span>
          </span>
        </Link>
      </section>
    </div>
  )
}
