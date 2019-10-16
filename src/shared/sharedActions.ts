import { WithBase } from 'react-imvc'
import { ExtralState } from './sharedInitialState'

export const UPDATE_HTML_TITLE = (state: WithBase<ExtralState>, title: string) => {
  let html = {
    ...state.html,
    title
  };
  return {
    ...state,
    html
  };
};

export const OPEN_MENU = (state: WithBase<ExtralState>) => {
  if (state.showMenu) {
    return state
  }
  return {
    ...state,
    showMenu: true,
  }
}

export const CLOSE_MENU = (state: WithBase<ExtralState>) => {
  if (!state.showMenu) {
    return state
  }
  return {
    ...state,
    showMenu: false,
  }
}

export const UPDATE_ALERT_TEXT = (state: WithBase<ExtralState>, alertText: string) => {
    return {
      ...state,
      alertText
    };
  };
  
  export const UPDATE_LOADING_TEXT = (state: WithBase<ExtralState>, loadingText: string) => {
    return {
      ...state,
      loadingText
    };
  };
  