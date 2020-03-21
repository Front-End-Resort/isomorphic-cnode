import type { Action } from 'react-imvc'
import type { ExtraState } from '../../shared/sharedInitialState'
import type { MessageInfo } from './View'
export type TAB = "hasNotRead" | "hasRead"
export type State = ExtraState & {
  pageTitle: string,
  tab: TAB,
  hasRead: MessageInfo[],
  hasNotRead: MessageInfo[]
}

export const initialState = {
  pageTitle: "消息",
  tab: "hasNotRead",
  hasRead: [],
  hasNotRead: []
}

export interface ComponentWillCreatePayload { hasRead: MessageInfo[], hasNotRead: MessageInfo[] }
export const COMPONENT_WILL_CREATE: Action<State, ComponentWillCreatePayload> = (state, { hasRead, hasNotRead }) => {
  let tab: TAB = hasNotRead.length > 0 ? "hasNotRead" : "hasRead"
  state = CHANGE_TAB(state, tab)
  return {
    ...state,
    hasRead,
    hasNotRead
  }
}

export const CHANGE_TAB: Action<State, TAB> = (state, tab) => {
  return {
    ...state,
    tab
  }
}
