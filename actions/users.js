import { CALL_API, Schemas } from '../middleware/api'
import {authorized} from "./authorizationHelpers";

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

// Fetches all users
// Relies on the custom API middleware defined in ../middleware/api.js.
function sendUser(user) {
  return {
    [CALL_API]: {
      types: [ CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE ],
      endpoint: `users`,
      verb: 'POST',
      schema: Schemas.USER, // todo: do we want to store this at all?
      payload: user
    }
  }
}

// Fetches all users (unless it is cached)
// Relies on Redux Thunk middleware.
export function createUser(user, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(sendUser(user));
  }
}


export const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST';
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
export const SAVE_USER_FAILURE = 'SAVE_USER_FAILURE';

// Fetches all users
// Relies on the custom API middleware defined in ../middleware/api.js.
function saveUser(user) {
  return {
    [CALL_API]: {
      types: [ SAVE_USER_REQUEST, SAVE_USER_SUCCESS, SAVE_USER_FAILURE ],
      endpoint: `users/${ user.ID }`,
      verb: 'PUT',
      schema: Schemas.USER,
      payload: user
    }
  }
}

// Fetches all users (unless it is cached)
// Relies on Redux Thunk middleware.
export function updateUser(user) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(saveUser(user)));
  }
}


export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

// Fetches a single user
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUser(userId) {
  return {
    [CALL_API]: {
      types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      endpoint: `users/${userId}`,
      schema: Schemas.USER
    }
  }
}

// Fetches a single user unless it is cached.
// Relies on Redux Thunk middleware.
export function loadUser(userId, requiredFields = []) {
  return (dispatch, getState) => {
    if (__USE_FRONTEND_CACHES__) {
      const user = getState().entities.users[userId]
      if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
        return null
      }
    }
    
    return dispatch(authorized(getState().login.jwt)(fetchUser(userId)));
  }
}

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';

// Fetches all users
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUsers() {
  return {
    [CALL_API]: {
      types: [ USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE ],
      endpoint: `users`,
      schema: Schemas.USER_ARRAY
    }
  }
}

// Fetches all users (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadUsers(requiredFields = []) {
  return (dispatch, getState) => {
    // todo: cache?
    // const user = getState().entities.users[login]
    // if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    //   return null
    // }
    
    return dispatch(authorized(getState().login.jwt)(fetchUsers()))
  }
}