import { MessageInfo } from './View'
export type TAB = "hasNotRead" | "hasRead"
export interface State {
  pageTitle: string,
  tab: TAB,
  hasRead: MessageInfo[],
  hasNotRead: MessageInfo[]
}

export const initialState: State = {
  pageTitle: "消息",
  tab: "hasNotRead",
  hasRead: [],
  hasNotRead: []
};

export const COMPONENT_WILL_CREATE = <S extends State>(state: S, { hasRead, hasNotRead }: { hasRead: MessageInfo[], hasNotRead: MessageInfo[] }) => {
  let tab: TAB = hasNotRead.length > 0 ? "hasNotRead" : "hasRead";
  state = CHANGE_TAB(state, tab);
  return {
    ...state,
    hasRead,
    hasNotRead
  };
};

export const CHANGE_TAB = <S extends State>(state: S, tab: TAB) => {
  return {
    ...state,
    tab
  };
};
