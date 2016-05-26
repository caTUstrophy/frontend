import { CALL_API, Schemas } from '../middleware/api'

export const CREATE_USERS_REQUEST = 'CREATE_USERS_REQUEST';
export const CREATE_USERS_SUCCESS = 'CREATE_USERS_SUCCESS';
export const CREATE_USERS_FAILURE = 'CREATE_USERS_FAILURE';

// Fetches all users
// Relies on the custom API middleware defined in ../middleware/api.js.
function sendUser(user) {
  return {
    [CALL_API]: {
      types: [ CREATE_USERS_REQUEST, CREATE_USERS_SUCCESS, CREATE_USERS_FAILURE ],
      endpoint: `users`,
      verb: 'POST',
      schema: Schemas.USER_ARRAY, // todo: no real response schema?
      payload: user
    }
  }
}

// Fetches all users (unless it is cached)
// Relies on Redux Thunk middleware.
export function createUser(user, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(sendUser(user))
  }
}

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

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
    const user = getState().entities.users[userId]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchUser(userId))
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

    return dispatch(fetchUsers())
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}