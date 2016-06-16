import merge from 'lodash/merge';
import * as ActionTypes from '../actions/userInterface'

export function userInterface(state = { userMenuOpen: false, sideMenuOpen: false, errorMessage: null }, action) {
  if (action.error) { // todo: bad style? intercepts all actions
    return merge({}, state, {errorMessage: JSON.stringify(action.error) });
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
  return state;
}

export default userInterface;