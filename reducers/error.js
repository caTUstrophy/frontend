import { RESET_ERROR } from '../actions/error'

export function error(state = null, action) {
  if (action.error) {
    return action.error;
  }
  if (action.type === RESET_ERROR) {
    return null;
  }
  return state;
}

export default error;