import { BaseState } from 'react-imvc'
import { ExtraState } from './sharedInitialState'

export const UPDATE_HTML_TITLE = <S extends ExtraState & BaseState>(state: S, title: string) => {
  let html = {
    ...state.html,
    title
  };
  return {
    ...state,
    html
  };
};

export const OPEN_MENU = <S extends ExtraState & BaseState>(state: S) => {
  if (state.showMenu) {
    return state
  }
  return {
    ...state,
    showMenu: true,
  }
}

export const CLOSE_MENU = <S extends ExtraState & BaseState>(state: S) => {
  if (!state.showMenu) {
    return state
  }
  return {
    ...state,
    showMenu: false,
  }
}

export const UPDATE_ALERT_TEXT = <S extends ExtraState & BaseState>(state: S, alertText: string) => {
    return {
      ...state,
      alertText
    };
  };
  
  export const UPDATE_LOADING_TEXT = <S extends ExtraState & BaseState>(state: S,  loadingText: string) => {
    return {
      ...state,
      loadingText
    };
  };
  