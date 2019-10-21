/**
 * Model
 */
import { UPDATE_HTML_TITLE } from '../../shared/sharedActions'
import { ActionWithPayload } from 'react-imvc'
import { ExtraState, UserInfo, Message } from "../../shared/sharedInitialState";

export type TYPE = 'replies' | 'topics'

export type State = ExtraState & {
  pageTitle: string,
  user: UserInfo | null,
  type: TYPE,
  currentData: Message[]
};

export const initialState = {
  pageTitle: "用户",
  user: null,
  type: "replies",
  currentData: []
};

export const COMPONENT_WILL_CREATE: ActionWithPayload<State, { user: UserInfo }> = (state, { user }) => {
  state = UPDATE_HTML_TITLE(state, user.loginname);
  return {
    ...state,
    user
  };
};

export const CHANGE_TYPE: ActionWithPayload<State, TYPE>  = (state, type) => {
  return {
    ...state,
    type
  };
};
