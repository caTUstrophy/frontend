import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import * as ActionTypes from '../actions/userInterface'

export function userMenuOpen(state = false, action) {
  if (action.type == ActionTypes.TOGGLE_USER_MENU) {
    return !state;
  }
  return state;
}

export function sideMenuOpen(state = false, action) {
  if (action.type == ActionTypes.TOGGLE_SIDE_MENU) {
    return !state;
  }
  return state;
}

export function errorMessage(state = null, action) {
  if (action.errorMessage || action.error) {
    return action.errorMessage || JSON.stringify(action.error);
  }
  if (action.type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  }

  return state;
}

export function notificationMessage(state = null, action) {
  if (action.notification) {
    return action.notification;
  }
  if (action.type === ActionTypes.RESET_NOTIFICATION_MESSAGE) {
    return null;
  }

  return state;
}

export function managePage(state = { selectedItem: null }, action) {
  if (action.type == ActionTypes.MANAGE_PAGE_SELECT_ITEM) {
    return merge({}, state, { selectedItem: { type: action.itemType, item: action.item } });
  }
  if (action.type == ActionTypes.MANAGE_PAGE_UNSELECT_ITEM) {
    return merge({}, state, { selectedItem: null });
  }
  return state;
}

export default combineReducers({
  userMenuOpen,
  sideMenuOpen,
  errorMessage,
  notificationMessage,
  managePage
});