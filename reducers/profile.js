import { PROFILE_SUCCESS } from '../actions/profile'

// profile reducer
export default function profile(state = null, action) {
  if (action.type == PROFILE_SUCCESS) {
    return action.response;
  }
  return state;
}