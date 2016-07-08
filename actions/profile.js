import { CALL_API } from '../middleware/api'
import { authorized } from './authorizationHelpers'

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

// Fetches user profile
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUserProfile() {
  return {
    [CALL_API]: {
      types: [ PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE ],
      endpoint: 'me'
    }
  }
}

// Fetches user profile
// Relies on Redux Thunk middleware.

export function loadUserProfile(requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchUserProfile()))
  }
}


export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

// Fetches user profile
// Relies on the custom API middleware defined in ../middleware/api.js.
function putUserProfile(profile) {
  return {
    [CALL_API]: {
      types: [ UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE ],
      endpoint: 'me',
      verb: 'PUT',
      payload: profile
    }
  }
}

// Fetches user profile
// Relies on Redux Thunk middleware.

export function updateUserProfile(profile) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(putUserProfile(profile)))
  }
}