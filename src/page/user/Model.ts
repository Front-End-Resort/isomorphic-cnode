/**
 * Model
 */
import { UPDATE_HTML_TITLE } from '../../shared/sharedActions'
import { WithBase } from 'react-imvc'
import { ExtralState, UserInfo, Message } from "../../shared/sharedInitialState";

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

export const COMPONENT_WILL_CREATE = <S extends WithBase<State & ExtralState>>(state: S, { user }: { user: UserInfo }) => {
  state = UPDATE_HTML_TITLE(state, user.loginname);
  return {
    ...state,
    user
  };
};

export const CHANGE_TYPE = <S extends WithBase<State & ExtralState>>(state: S, type: string) => {
  return {
    ...state,
    type
  };
};
