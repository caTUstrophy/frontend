import { CALL_API, Schemas } from '../middleware/api'

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