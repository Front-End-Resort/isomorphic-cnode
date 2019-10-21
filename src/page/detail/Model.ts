/**
 * actions of method
 */
import { Action, ActionWithPayload } from 'react-imvc'
import { UPDATE_HTML_TITLE } from "../../shared/sharedActions";
import { ExtraState, UserInfo, Reply, Topic } from "../../shared/sharedInitialState";
import { markdown } from "markdown";

export type State = ExtraState & {
  pageTitle: string,
  topic: Topic | null,
  activeReplyId: number | string | null,
  replyOfOthers: Record<string, string>,
  replyOfTopic: string
}

export const initialState = {
  pageTitle: "详情",
  topic: null,
  activeReplyId: null,
  replyOfOthers: {},
  replyOfTopic: ""
};

/**
 * 
 * 首屏数据为 topic
 */
export const COMPONENT_WILL_CREATE: ActionWithPayload<State, { topic: Topic | null }> = (state, { topic }) => {
  if (topic) {
    state = UPDATE_HTML_TITLE(state, topic.title)
  }
  return {
    ...state,
    topic
  };
};

/**
 * 点击其他用户评论下的回复时，
 * 展示评论表单
 * 将当前 replyId 设置为 active 并确保 replyOfOthers[replyId] 不为 undefined
 * 如果再次点击，则收起表单
 */
export const TOGGLE_REPLY_FORM: ActionWithPayload<State, { activeReplyId: string }> = (state, { activeReplyId }) => {
  if (activeReplyId === state.activeReplyId) {
    return HIDE_REPLY_FORM(state);
  } else {
    return SHOW_REPLY_FORM(state, activeReplyId);
  }
};

export const SHOW_REPLY_FORM: ActionWithPayload<State, string> = (state, activeReplyId) => {
  let replyOfOthers = state.replyOfOthers;

  if (!replyOfOthers[activeReplyId]) {
    replyOfOthers = { ...replyOfOthers };
    let replyItem = state.topic && state.topic.replies.find(item => item.id === activeReplyId);
    replyOfOthers[activeReplyId] = `@${replyItem && replyItem.author.loginname} `;
  }

  return {
    ...state,
    activeReplyId,
    replyOfOthers
  };
};

export const HIDE_REPLY_FORM: Action<State> = (state) => {
  return {
    ...state,
    activeReplyId: null
  };
};

export const LIKE_REPLY: ActionWithPayload<State, { action: string, replyId: string }> = (state, { action, replyId }) => {
  let { topic, userInfo } = state;
  let userId: string
  if (userInfo) {
    userId = userInfo.id
  }

  let replies = topic && topic.replies.map(reply => {
    if (reply.id !== replyId) {
      return reply;
    }
    let { ups } = reply;
    if (action === "down") {
      ups = ups.filter(id => id !== userId);
    } else if (action === "up") {
      ups = ups.concat(userId as string);
    }
    return {
      ...reply,
      ups
    };
  });

  topic = { ...topic, replies } as Topic;

  return {
    ...state,
    topic
  };
};

export const REPLY_TO_TOPIC: ActionWithPayload<State, { replyId: string, content: string }> = (state, payload) => {
  state = ADD_REPLY(state, payload);
  return {
    ...state,
    replyOfTopic: ""
  };
};

export const REPLY_TO_OTHER: ActionWithPayload<State, { replyId: string, newReplyId: string, content: string }> = (state, { replyId, newReplyId, content }) => {
  state = ADD_REPLY(state, {
    replyId: newReplyId,
    content: content
  });

  let replyOfOthers = {
    ...state.replyOfOthers,
    [replyId]: ""
  };

  return {
    ...state,
    replyOfOthers
  };
};

export const ADD_REPLY: ActionWithPayload<State, { replyId: string, content: string }> = (state, { replyId, content }) => {
  let { userInfo, topic } = state;
  let replyItem = createReplyItem({ replyId, content, userInfo: userInfo as UserInfo });

  topic = {
    ...topic,
    replies: topic ? topic.replies.concat(replyItem) : []
  } as Topic

  return {
    ...state,
    topic
  };
};

function createReplyItem({ replyId, content, userInfo }: { replyId: string, content: string, userInfo: UserInfo }): Reply {
  let create_at = new Date().getTime();
  return {
    id: replyId,
    author: {
      loginname: userInfo.loginname,
      avatar_url: userInfo.avatar_url
    },
    content: markdown.toHTML(content),
    ups: [],
    create_at
  };
}
