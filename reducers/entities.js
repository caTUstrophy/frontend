import merge from 'lodash/merge'
import { REFRESH_LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_AFTER_TIMEOUT } from '../actions/login'

// Updates an entity cache in response to any action with response.entities.
export default function entities(state = { users: {}, offers: {}, requests: {}, matchings: {}, regions: {} }, action) {
  if (action.type == LOGOUT_SUCCESS || action.type == LOGOUT_AFTER_TIMEOUT || action.type == REFRESH_LOGIN_FAILURE) {
    return entities(undefined, {});
  }
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  
  return state;
}
