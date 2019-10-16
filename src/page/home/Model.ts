import { WithBase } from 'react-imvc'
/**
 * Model
 */
export type SearchParams = {
  page: number,
  limit: number,
  tab: string,
  mdrender: boolean
}

export type State = {
  pageTitle: string,
  topics: any[],
  searchParams: SearchParams
}

export const initialState = {
  pageTitle: '首页',
  // 主题列表
  topics: [],
  // 请求参数
  searchParams: {
    page: 1,
    limit: 20,
    tab: "all",
    mdrender: true
  },
};

/**
 * 在 View 创建前将首屏数据合并到 state 里
 */
export const COMPONENT_WILL_CREATE = (state: WithBase<State>, data: AddData) => {
  return ADD_TOPICS(state, data)
}

/**
 * 
 * 滚动到底部时，加载新的数据并更新查询参数
 */
export type ScrollPayload = {
  data: AddData,
  searchParams: SearchParams
}
export const SCROLL_TO_BOTTOM = (state: WithBase<State>, { data, searchParams }: ScrollPayload) => {
  state = ADD_TOPICS(state, data);
  state = UPDATE_SEARCH_PARAMS(state, searchParams)
  return state
};


/**
 * 更新查询参数
 */
export const UPDATE_SEARCH_PARAMS = (state: WithBase<State>, searchParams: SearchParams) => {
  return {
    ...state,
    searchParams,
  }
}


// 添加主题列表
export type AddData = {
  content: string,
  [x: string]: any
}[]
export const ADD_TOPICS = (state: WithBase<State>, data: AddData) => {
  let topics = data.map(item => {
    let { content, ...topic } = item;
    return topic;
  });

  return {
    ...state,
    topics: state.topics.concat(topics)
  };
};

