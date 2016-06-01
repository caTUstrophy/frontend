import { CALL_API } from '../middleware/api';
import LocalStorage from '../helpers/LocalStorage';
import {authorized} from "./authorizationHelpers";

export const LOGIN_LOCAL_STORAGE_KEY = 'login';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Relies on the custom API middleware defined in ../middleware/api.js.
function sendLogin(login) {
  return {
    [CALL_API]: {
      types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
      endpoint: `auth`,
      verb: 'POST',
      schema: null, // don't normalize the result
      payload: login
    }
  }
}

// Relies on Redux Thunk middleware.
export function login(login, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(sendLogin(login))
  }
}


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// Relies on the custom API middleware defined in ../middleware/api.js.
function sendLogout() {
  return {
    [CALL_API]: {
      types: [ LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE ],
      endpoint: `auth`,
      verb: 'DELETE',
      schema: null // don't normalize the result
    }
  }
}
// Relies on Redux Thunk middleware.
export function logout() {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(sendLogout()))
  }
}

export function tryRestoreLogin() {
  const jwt = LocalStorage.getItem(LOGIN_LOCAL_STORAGE_KEY);
  if (jwt) {
    return (dispatch, getState) => {
      return dispatch({ type: LOGIN_SUCCESS, jwt });
    }
  } else {
    return (dispatch, getState) => {
      return dispatch({ type: 'NOOP' });
    }
  }
}