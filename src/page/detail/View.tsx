import React from "react"
import classnames from "classnames"
import { Link, Input } from "react-imvc/component"
import { useCtrl, useModel, useModelActions } from 'react-imvc/hook'
import { purify, staticify } from '../../shared/hoc'
import * as _ from "../../shared/util"
import Layout from "../../component/Layout"
import { Reply, Topic } from "../../shared/sharedInitialState"
import { State } from './Model'

export type Ctrl = {
  handleLikeReply: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  handleToggleReplyForm: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  handleReplyOther: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  handleReplyTopic: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

export type ViewProps = {
  state: State,
  ctrl: Ctrl
}

export default function View({ state, ctrl }: ViewProps) {
  let { isLogin, topic, activeReplyId, replyOfOthers } = state

  let ctrl1 = useCtrl()
  let model = useModel()
  let actions = useModelActions()

  console.log({ ctrl1, model, actions })

  if (!topic) {
    return (
      <Layout>
        <NoTopic />
      </Layout>
    )
  }

  return (
    <Layout>
      <div id="page">
        <h2 className="topic-title">{topic.title}</h2>
        <TopicAuthorInfo topic={topic} />
        <StaticTopicContent content={topic.content} />
        <TopicReplyCount count={topic.reply_count} />
        <ReplyForm
          if={isLogin}
          id={-1}
          name="replyOfTopic"
          onSubmit={ctrl.handleReplyTopic}
        />
        <TopicReplyList
          replies={topic.replies}
          replyOfOthers={replyOfOthers}
          activeReplyId={activeReplyId}
          isLogin={isLogin}
          ctrl={ctrl}
        />
      </div>
    </Layout>
  )
}

const StaticTopicContent = staticify()(TopicContent)

function TopicContent({ content }: { content: string }) {
  return (
    <section
      className="markdown-body topic-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

function TopicReplyCount({ count }: { count: number }) {
  return (
    <h3 className="topic-reply">
      <strong>{count}</strong> 回复
    </h3>
  )
}

function NoTopic() {
  return (
    <div style={{ height: "100%", background: "#fff" }}>
      <div className="no-data">
        <i className="iconfont icon-empty">&#xe60a</i>
        该话题不存在!
      </div>
    </div>
  )
}

export interface TopicAuthorInfoProps {
  topic: Topic
}

function TopicAuthorInfo({ topic }: TopicAuthorInfoProps) {
  let tagClass = classnames({
    tag: true,
    [_.getTabClassName(topic.tab, topic.good, topic.top)]: true
  })
  return (
    <section className="author-info">
      <Link
        as="img"
        className="avatar"
        src={topic.author.avatar_url}
        to={`/user/${topic.author.loginname}`}
      />
      <div className="col">
        <span>{topic.author.loginname}</span>
        <time>发布于:{_.getLastTimeStr(topic.create_at, true)}</time>
      </div>
      <div className="right">
        <span className={tagClass}>
          {_.getTabStr(topic.tab, topic.good, topic.top)}
        </span>
        <span className="name">{topic.visit_count}次浏览</span>
      </div>
    </section>
  )
}

export interface ReplyFormProps {
  if: boolean | undefined
  id: string | number
  name: string
  value?: string
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function ReplyForm(props: ReplyFormProps) {
  if (!props.if) {
    return null
  }

  let { id, name, onSubmit } = props

  return (
    <section className="reply">
      <Input
        as="textarea"
        name={name}
        rows="8"
        value={props.value || ''}
        className="text"
        placeholder="回复支持Markdown语法,请注意标记代码"
      />
      <button className="button" onClick={onSubmit} data-id={id}>
        确定
      </button>
    </section>
  )
}

export interface TopicReplyListProps {
  replies: Reply[]
  replyOfOthers: Record<string, any>
  activeReplyId: string | number | null
  isLogin: boolean | undefined
  ctrl: {
    handleLikeReply: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
    handleToggleReplyForm: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
    handleReplyOther: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  }
}

function TopicReplyList({ replies, replyOfOthers, activeReplyId, isLogin, ctrl }: TopicReplyListProps) {
  return (
    <section className="reply-list">
      <ul>
        {replies.map(reply => (
          <PureReplyItem
            key={reply.id}
            reply={reply}
            replyContent={replyOfOthers[reply.id]}
            showReplyForm={!!isLogin && activeReplyId === reply.id}
            ctrl={ctrl}
          />
        ))}
      </ul>
    </section>
  )
}

const PureReplyItem = purify()(ReplyItem)

export interface ReplyItemProps {
  reply: Reply,
  replyContent: string,
  ctrl: {
    handleLikeReply: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
    handleToggleReplyForm: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
    handleReplyOther: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  },
  showReplyForm: boolean
}

function ReplyItem({ reply, replyContent, ctrl, showReplyForm }: ReplyItemProps) {
  return (
    <li>
      <section className="user">
        <Link
          as="img"
          className="head"
          src={reply.author.avatar_url}
          to={`/user/${reply.author.loginname}`}
        />
        <div className="info">
          <span className="cl">
            <span className="name">{reply.author.loginname}</span>
            <span className="name mt10">
              <span />发布于:{_.getLastTimeStr(reply.create_at.toString(), true)}
            </span>
          </span>
          <span className="cr">
            <LikeIcon
              id={reply.id}
              like={reply.isUps}
              onClick={ctrl.handleLikeReply}
            />
            {reply.ups.length}
            <ShowFormButton
              id={reply.id}
              onClick={ctrl.handleToggleReplyForm}
            />
          </span>
        </div>
      </section>
      <div
        className="reply_content"
        dangerouslySetInnerHTML={{ __html: reply.content }}
      />
      <ReplyForm
        if={showReplyForm}
        id={reply.id}
        name={`replyOfOthers.${reply.id}`}
        value={replyContent}
        onSubmit={ctrl.handleReplyOther}
      />
    </li>
  )
}

export interface LikeIconProps {
  id: string,
  like?: boolean,
  onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

function LikeIcon({ id, like, onClick }: LikeIconProps) {
  let className = classnames({
    iconfont: true,
    icon: true,
    uped: like
  })
  return (
    <span className={className} onClick={onClick} data-id={id}>
      &#xe608
    </span>
  )
}

export interface ShowFormButtonProps {
  id: string,
  onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

function ShowFormButton({ id, onClick }: ShowFormButtonProps) {
  return (
    <span className="iconfont icon" onClick={onClick} data-id={id}>
      &#xe609
    </span>
  )
}
