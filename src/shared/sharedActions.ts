import { Action, ActionWithPayload } from 'react-imvc'
import { ExtraState } from './sharedInitialState'

export const UPDATE_HTML_TITLE: ActionWithPayload<ExtraState, string> = (state, title) => {
  let html = {
    ...state.html,
    title
  }
  return {
    ...state,
    html
  }
}

export const OPEN_MENU: Action<ExtraState> = (state) => {
  if (state.showMenu) {
    return state
  }
  return {
    ...state,
    showMenu: true,
  }
}

export const CLOSE_MENU: Action<ExtraState> = (state) => {
  if (!state.showMenu) {
    return state
  }
  return {
    ...state,
    showMenu: false,
  }
}

export const UPDATE_ALERT_TEXT: ActionWithPayload<ExtraState, string> = (state, alertText) => {
  return {
    ...state,
    alertText
  }
}

export const UPDATE_LOADING_TEXT: ActionWithPayload<ExtraState, string> = (state,  loadingText) => {
  return {
    ...state,
    loadingText
  }
}
  