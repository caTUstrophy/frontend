import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import jwtDecode from 'jwt-decode';

import paginate from './paginate'
import userInterface from './userInterface'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';

import LocalStorage from '../helpers/LocalStorage'

import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_LOCAL_STORAGE_KEY } from '../actions/login'

// login reducer
function login(state = null, action) {
  if (action.type == LOGIN_SUCCESS) {
    // todo: pure function violation?
    let jwt = action.jwt || action.response.AccessToken;

    const token = jwtDecode(jwt);
    LocalStorage.setItem(LOGIN_LOCAL_STORAGE_KEY, jwt);
    const expires = new Date(new Date().getTime() + token.exp / 1000);

    if (expires < new Date()) {
      return state;
    }

    return {
      jwt,
      token,
      expires
    };
  } else if (action.type == LOGOUT_SUCCESS) {
    LocalStorage.removeItem(LOGIN_LOCAL_STORAGE_KEY);
    return null;
  }

  return state;
}

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, offers: {}, requests: {}, matchings: {}, login: null }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
})

const rootReducer = combineReducers({
  login,
  entities,
  // pagination,
  userInterface,
  routing,
  form: formReducer
})

export default rootReducer
