import { RECOMMENDATIONS_SUCCESS } from '../actions/recommendations'

// recommendation reducer
export default function profile(state = [], action) {
  if (action.type == RECOMMENDATIONS_SUCCESS) {
    return action.response;
  }
  return state;
}