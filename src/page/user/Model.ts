/**
 * Model
 */
import { UPDATE_HTML_TITLE } from '../../shared/sharedActions'
import { Action } from 'react-imvc'
import { ExtraState, UserInfo, Message } from "../../shared/sharedInitialState"

export type TYPE = 'replies' | 'topics'

export type State = ExtraState & {
  pageTitle: string,
  user: UserInfo | null,
  type: TYPE,
  currentData: Message[]
}

export const initialState = {
  pageTitle: "用户",
  user: null,
  type: "replies",
  currentData: []
}

export interface ComponentWillCreate { user: UserInfo }
export const COMPONENT_WILL_CREATE: Action<State, ComponentWillCreate> = (state, { user }) => {
  state = UPDATE_HTML_TITLE(state, user.loginname)
  return {
    ...state,
    user
  }
}

export const CHANGE_TYPE: Action<State, TYPE>  = (state, type) => {
  return {
    ...state,
    type
  }
}
