import merge from 'lodash/merge'

// Updates an entity cache in response to any action with response.entities.
export default function entities(state = { users: {}, offers: {}, requests: {}, matchings: {}, regions: {}, notifications: {}, login: null }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  
  return state;
}
