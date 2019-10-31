import React from "react"
import classnames from "classnames"
import { Link } from "react-imvc/component"
import Layout from "../../component/Layout"
import * as _ from '../../shared/util'
import { State } from './Model'
import Ctrl from './Controller'

export type ViewProps = {
  state: State,
  ctrl: Ctrl
}

export default function View({ state, ctrl }: ViewProps) {
  let { tab, hasNotRead } = state
  let hasReadClass = classnames({
    item: true,
    br: true,
    selected: tab === "hasRead"
  })
  let hasNotReadClass = classnames({
    item: true,
    br: true,
    selected: tab === "hasNotRead"
  })
  return (
    <Layout>
      <div className="page">
        <ul className="tabs">
          <li
            className={hasReadClass}
            data-tab="hasRead"
            onClick={ctrl.handleTabChange}
          >
            已读消息
          </li>
          <li
            className={hasNotReadClass}
            data-tab="hasNotRead"
            onClick={ctrl.handleTabChange}
          >
            未读消息
            {hasNotRead.length > 0 && (
              <i className="iconfont read" onClick={ctrl.handleMarkAll}>
                &#xe60c
              </i>
            )}
          </li>
        </ul>
        <MessageContent list={state[tab]} />
      </div>
    </Layout>
  )
}

export interface MessageContentProps {
  list: MessageInfo[]
}

function MessageContent({ list }: MessageContentProps) {
  if (!list || !list.length) {
    return <Empty />
  }
  return <div>{list.map(data => <MessageInfo {...data} key={data.id} />)}</div>
}

function Empty() {
  return (
    <div className="no-data">
      <i className="iconfont icon-empty">&#xe60a</i>
      暂无数据!
    </div>
  )
}

export interface Reply {
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

export interface Topic {
  id: string
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

export interface MessageInfo {
  id: string,
  title: string,
  author: {
    loginname: string,
    avatar_url: string
  },
  type: string,
  reply: Reply
  topic: Topic
}

function MessageInfo(props: MessageInfo) {
  let { author, type, reply, topic } = props
  return (
    <div className="message markdown-body">
      <section className="user">
        <Link
          as="img"
          className="head"
          src={author.avatar_url}
          to={`/user/${author.loginname}`}
        />
        <div className="info">
          <span className="cl">
            <span className="name">{author.loginname}</span>
            {type === "at" && <span className="name">在回复中@了您</span>}
            {type === "reply" && <span className="name">回复了您的话题</span>}
          </span>
          <span className="cr">
            <span className="name">
              {_.getLastTimeStr(reply.create_at.toString(), true)}
            </span>
          </span>
        </div>
      </section>
      <div
        className="reply_content"
        dangerouslySetInnerHTML={{ __html: reply.content }}
      />
      <Link className="topic-title" to={`/topic/${topic.id}`}>
        话题：{topic.title}
      </Link>
    </div>
  )
}
