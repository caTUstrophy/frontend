import { combineReducers } from 'redux'

import { REFRESH_LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_AFTER_TIMEOUT } from '../actions/login'

const genericEntityReducer = function (entityName) {
  return function (state = {}, action) {
    if (action.type == LOGOUT_SUCCESS || action.type == LOGOUT_AFTER_TIMEOUT || action.type == REFRESH_LOGIN_FAILURE) {
      return genericEntityReducer(entityName)(undefined, {});
    }
  
    if (!action.response || !action.response.entities) {
      return state;
    }
    
    let entities = action.response.entities[entityName];
    
    if (!entities) {
      return state;
    }
    
    let clonedState = Object.assign({}, state);
    
    for (let entityId in entities) {
      if (entities.hasOwnProperty(entityId)) {
        clonedState[entityId] = entities[entityId];
      }
    }
      
    return clonedState;
  }
};

// Updates an entity cache in response to any action with response.entities.
export default combineReducers({
    users: genericEntityReducer('users'),
    offers: genericEntityReducer('offers'),
    requests: genericEntityReducer('requests'),
    matchings: genericEntityReducer('matchings'),
    regions: genericEntityReducer('regions'),
    notifications: genericEntityReducer('notifications'),
    tags: genericEntityReducer('tags')
});
