/**
 * Model
 */
import { UPDATE_HTML_TITLE } from '../../shared/sharedActions'
import { BaseState } from 'react-imvc'
import { ExtraState, UserInfo, Message } from "../../shared/sharedInitialState";

export type TYPE = 'replies' | 'topics'

export interface State {
  pageTitle: string,
  user: UserInfo | null,
  type: TYPE,
  currentData: Message[]
};

export const initialState: State = {
  pageTitle: "用户",
  user: null,
  type: "replies",
  currentData: []
};

export const COMPONENT_WILL_CREATE = (state: State & ExtraState & BaseState, { user }: { user: UserInfo }) => {
  state = UPDATE_HTML_TITLE(state, user.loginname);
  return {
    ...state,
    user
  };
};

export const CHANGE_TYPE = (state: State & ExtraState & BaseState, type: TYPE) => {
  return {
    ...state,
    type
  };
};
