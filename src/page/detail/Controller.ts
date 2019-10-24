import Controller from "../../shared/BaseController"
import View, { Ctrl } from "./View"
import * as Model from "./Model"
import * as _ from "../../shared/util"

const replySuffix = `\n来自 [isomorphic-cnode](https://lucifier129.github.io/isomorphic-cnode/publish/static/)`

export type Actions = Omit<typeof Model, 'initialState'>

class Detail extends Controller<Model.State, Actions> implements Ctrl {
  KeepAlive = true
  View = View
  Model = Model

  async componentWillCreate() {
    let { COMPONENT_WILL_CREATE } = this.store.actions
    let state = this.store.getState()
    let topicId = state.location.params.topicId
    try {
      let { data: topic } = await this.get(`/topic/${topicId}`)
      COMPONENT_WILL_CREATE({ topic })
    } catch (error) {
      COMPONENT_WILL_CREATE({ topic: null })
    }
  }

  handleToggleReplyForm = ({ currentTarget }: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!this.checkLogin()) {
      return
    }
    let { TOGGLE_REPLY_FORM } = this.store.actions
    let activeReplyId = currentTarget.getAttribute("data-id")
    TOGGLE_REPLY_FORM({ activeReplyId: activeReplyId as string })
  }

  handleLikeReply = async ({ currentTarget }: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!this.checkLogin()) {
      return
    }
    let { LIKE_REPLY } = this.store.actions
    let replyId = currentTarget.getAttribute("data-id")

    try {
      let { action } = await this.likeReply(replyId as string)
      LIKE_REPLY({ action, replyId: replyId as string })
    } catch (error) {
      this.showAlert(error.message)
    }
  }

  handleReplyTopic = async ({ currentTarget }: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!this.checkLogin()) {
      return
    }
    let { REPLY_TO_TOPIC } = this.store.actions
    let state = this.store.getState()
    let params = {
      content: state.replyOfTopic
    }

    this.showLoading("回复中……")

    try {
      let data = await this.postReply(params)
      let { reply_id: replyId, content } = data
      REPLY_TO_TOPIC({ replyId, content })
    } catch (error) {
      this.showAlert(error.message)
    }

    this.hideLoading()
  }

  handleReplyOther = async ({ currentTarget }: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!this.checkLogin()) {
      return
    }
    let { REPLY_TO_OTHER } = this.store.actions
    let state = this.store.getState()
    let replyId = currentTarget.getAttribute("data-id")
    let params = {
      replyId: replyId,
      content: state.replyOfOthers[replyId as string]
    }

    this.showLoading("回复中……")

    try {
      let data = await this.postReply(params)
      let { reply_id: newReplyId, content } = data
      REPLY_TO_OTHER({ replyId: replyId as string, newReplyId, content })
    } catch (error) {
      this.showAlert(error.message)
    }

    this.hideLoading()
  }

  checkLogin() {
    if (!this.isLogin()) {
      this.history.push(`/login?redirect=${this.location.raw}`)
      return false
    }
    return true
  }

  likeReply(replyId: string) {
    let url = `/reply/${replyId}/ups`
    let accesstoken = this.cookie("accesstoken")
    return this.post(url, { accesstoken })
  }

  async postReply({ content, replyId }: { content: string, replyId?: string | null }) {
    if (!content || content.length <= 10) {
      throw new Error("评论内容不能少于10个字")
    }

    content = _.linkUsers(content) + replySuffix

    let topicId = this.location.params.topicId
    let url = `/topic/${topicId}/replies`
    let accesstoken = this.cookie("accesstoken")
    let params: Record<string, any> = { accesstoken, content }

    if (replyId) {
      params["reply_id"] = replyId
    }
    let data = await this.post(url, params)

    return {
      ...data,
      content
    }
  }
}

export default Detail