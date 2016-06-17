import merge from 'lodash/merge';
import * as ActionTypes from '../actions/userInterface'

export function userInterface(state = { userMenuOpen: false, sideMenuOpen: false, errorMessage: null, managePage: { selectedItem: null } }, action) {
  if (action.errorMessage || action.error) { // todo: bad style? intercepts all actions
    return merge({}, state, { errorMessage: action.errorMessage || JSON.stringify(action.error) });
  }
  if (action.type === ActionTypes.RESET_ERROR_MESSAGE) {
    return merge({}, state, { errorMessage: null });
  }
  if (action.type == ActionTypes.TOGGLE_USER_MENU) {
    return merge({}, state, { userMenuOpen: !state.userMenuOpen });
  }
  if (action.type == ActionTypes.TOGGLE_SIDE_MENU) {
    return merge({}, state, { sideMenuOpen: !state.sideMenuOpen });
  }

  if (action.type == ActionTypes.MANAGE_PAGE_SELECT_ITEM) {
    return merge({}, state, { managePage: { selectedItem: { type: action.itemType, item: action.item } } });
  }
  if (action.type == ActionTypes.MANAGE_PAGE_UNSELECT_ITEM) {
    return merge({}, state, { managePage: { selectedItem: null } });
  }
  return state;
}

export default userInterface;