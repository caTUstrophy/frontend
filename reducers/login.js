import jwtDecode from 'jwt-decode';

import LocalStorage from '../helpers/LocalStorage';

import { LOGIN_SUCCESS, RESTORE_LOGIN_SUCCESS, REFRESH_LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_LOCAL_STORAGE_KEY, LOGOUT_AFTER_TIMEOUT } from '../actions/login'

// login reducer
export default function login(state = null, action) {
  if (action.type == LOGOUT_SUCCESS || action.type == LOGOUT_AFTER_TIMEOUT) {
    LocalStorage.removeItem(LOGIN_LOCAL_STORAGE_KEY);
    return null;
  }

  let jwt;
  switch (action.type) {
    case LOGIN_SUCCESS:
      jwt = action.response.AccessToken;
      break;
    case RESTORE_LOGIN_SUCCESS:
      jwt = action.jwt;
      break;
    case REFRESH_LOGIN_SUCCESS:
      jwt = action.response.AccessToken;
      break;
  }
  
  if (jwt) {
    // todo: pure function violation?
    LocalStorage.setItem(LOGIN_LOCAL_STORAGE_KEY, jwt);

    const token = jwtDecode(jwt);
    const expires = new Date(token.exp);

    if (expires < new Date()) {
      return null;
    }

    return {
      jwt,
      token,
      expires
    };

  }

  return state;
}