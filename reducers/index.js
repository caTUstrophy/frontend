import * as ActionTypes from '../actions'
import merge from 'lodash/merge'

import paginate from './paginate'
import userInterface from './userInterface'
import login from './login'
import error from './error'
import profile from './profile'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, offers: {}, requests: {}, matchings: {}, login: null }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
});

const rootReducer = combineReducers({
  login,
  entities,
  profile,
  // pagination,
  userInterface,
  error,
  routing,
  form: formReducer
});

export default rootReducer