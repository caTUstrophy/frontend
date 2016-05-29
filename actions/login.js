import { CALL_API } from '../middleware/api';
import LocalStorage from '../helpers/LocalStorage';

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