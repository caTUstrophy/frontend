import { LOCATION_SUCCESS } from '../actions/location'

// login reducer
export default function location(state = null, action) {
  if (action.type == LOCATION_SUCCESS) {
    return action.response;
  }

  return state;
}