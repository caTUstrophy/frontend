import merge from 'lodash/merge'
import { REFRESH_LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_AFTER_TIMEOUT } from '../actions/login'

// Updates an entity cache in response to any action with response.entities.
export default function entities(state = { users: {}, offers: {}, requests: {}, matchings: {}, regions: {}, notifications: {}, tags: {} }, action) {
  if (action.type == LOGOUT_SUCCESS || action.type == LOGOUT_AFTER_TIMEOUT || action.type == REFRESH_LOGIN_FAILURE) {
    return entities(undefined, {});
  }
  if (action.response && action.response.entities) {
    let clonedState = Object.assign({}, state);
    for (let entityType in action.response.entities) {
      if (action.response.entities.hasOwnProperty(entityType)) {
        let entityGroup = action.response.entities[entityType];
        for (let entityId in entityGroup) {
          if (entityGroup.hasOwnProperty(entityId)) {
            clonedState[entityType][entityId] = entityGroup[entityId];
          }
        }
      }
    }
    return clonedState;
  }
  
  return state;
}
