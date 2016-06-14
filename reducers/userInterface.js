import merge from 'lodash/merge';
import * as ActionTypes from '../actions/userInterface'

export function userInterface(state = { userMenuOpen: false, errorMessage: null }, action) {
  if (action.errorMessage) {
    return merge({}, state, { errorMessage: action.errorMessage });
  }
  if (action.type === ActionTypes.RESET_ERROR_MESSAGE) {
    return merge({}, state, { errorMessage: null });
  }
  if (action.type == ActionTypes.TOGGLE_USER_MENU) {
    return merge({}, state, { userMenuOpen: !state.userMenuOpen });
  }
  return state;
}

export default userInterface;