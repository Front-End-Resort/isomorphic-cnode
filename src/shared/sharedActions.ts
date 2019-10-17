import { ExtralState } from './sharedInitialState'

export const UPDATE_HTML_TITLE = <S extends ExtralState>(state: S, title: string) => {
  let html = {
    ...state.html,
    title
  };
  return {
    ...state,
    html
  };
};

export const OPEN_MENU = <S extends ExtralState>(state: S) => {
  if (state.showMenu) {
    return state
  }
  return {
    ...state,
    showMenu: true,
  }
}

export const CLOSE_MENU = <S extends ExtralState>(state: S) => {
  if (!state.showMenu) {
    return state
  }
  return {
    ...state,
    showMenu: false,
  }
}

export const UPDATE_ALERT_TEXT = <S extends ExtralState>(state: S, alertText: string) => {
    return {
      ...state,
      alertText
    };
  };
  
  export const UPDATE_LOADING_TEXT = <S extends ExtralState>(state: S,  loadingText: string) => {
    return {
      ...state,
      loadingText
    };
  };
  