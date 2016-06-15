import { CALL_API, Schemas } from '../middleware/api'
import { authorized } from './authorizationHelpers'

export const CREATE_REQUESTS_REQUEST = 'CREATE_REQUESTS_REQUEST';
export const CREATE_REQUESTS_SUCCESS = 'CREATE_REQUESTS_SUCCESS';
export const CREATE_REQUESTS_FAILURE = 'CREATE_REQUESTS_FAILURE';

// Fetches all requests
// Relies on the custom API middleware defined in ../middleware/api.js.
function sendRequest(request) {
  return {
    [CALL_API]: {
      types: [ CREATE_REQUESTS_REQUEST, CREATE_REQUESTS_SUCCESS, CREATE_REQUESTS_FAILURE ],
      endpoint: `requests`,
      verb: 'POST',
      schema: Schemas.REQUEST_ARRAY, // todo: no real response schema?
      payload: request
    }
  }
}

// Fetches all requests (unless it is cached)
// Relies on Redux Thunk middleware.
export function createRequest(request, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(sendRequest(request)))
  }
}

export const REQUEST_REQUEST = 'REQUEST_REQUEST';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';

// Fetches a single request
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRequest(requestId) {
  return {
    [CALL_API]: {
      types: [ REQUEST_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE ],
      endpoint: `requests/${requestId}`,
      schema: Schemas.REQUEST
    }
  }
}

// Fetches a single request unless it is cached.
// Relies on Redux Thunk middleware.
export function loadRequest(requestId, requiredFields = []) {
  return (dispatch, getState) => {
    const request = getState().entities.requests[requestId];
    if (request && requiredFields.every(key => request.hasOwnProperty(key))) {
      return null;
    }
    
    return dispatch(authorized(getState().login.jwt)(fetchRequest(requestId)));
  }
}

export const REQUESTS_REQUEST = 'REQUESTS_REQUEST';
export const REQUESTS_SUCCESS = 'REQUESTS_SUCCESS';
export const REQUESTS_FAILURE = 'REQUESTS_FAILURE';

// Fetches all requests
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRequestsBase(endpoint) {
  return {
    [CALL_API]: {
      types: [ REQUESTS_REQUEST, REQUESTS_SUCCESS, REQUESTS_FAILURE ],
      endpoint,
      schema: Schemas.REQUEST_ARRAY
    }
  }
}

function fetchRequests(area = "worldwide") {
  return fetchRequestsBase(`requests/${ area }`)
}

function fetchUserRequests() {
  return fetchRequestsBase(`me/requests`)
}

// Fetches all requests (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadRequests(requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchRequests()))
  }
}

export function loadUserRequests(requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchUserRequests()))
  }
}