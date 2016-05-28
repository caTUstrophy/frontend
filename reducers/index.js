import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';

import { LOGIN_SUCCESS } from '../actions/login'

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, repos: {}, login: null }, action) {
  if (action.type == LOGIN_SUCCESS) {
    return merge({}, state, { login: action.response });
  }

  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
})

const rootReducer = combineReducers({
  entities,
  // pagination,
  errorMessage,
  routing,
  form: formReducer
})

export default rootReducer
