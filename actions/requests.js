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
      schema: Schemas.REQUEST,
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
      schema: Schemas.REQUEST,
      reference: "requestID"
    }
  }
}

// Fetches a single request unless it is cached.
// Relies on Redux Thunk middleware.
export function loadRequest(requestId, requiredFields = []) {
  return (dispatch, getState) => {
    if (__USE_FRONTEND_CACHES__) {
      const request = getState().entities.requests[requestId];
      if (request && requiredFields.every(key => request.hasOwnProperty(key))) {
        return null;
      }
    }
    
    return dispatch(authorized(getState().login.jwt)(fetchRequest(requestId)));
  }
}

export const REQUESTS_REQUEST = 'REQUESTS_REQUEST';
export const REQUESTS_SUCCESS = 'REQUESTS_SUCCESS';
export const REQUESTS_FAILURE = 'REQUESTS_FAILURE';

// Fetches all requests
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRequestsBase(endpoint, reference) {
  return {
    [CALL_API]: {
      types: [ REQUESTS_REQUEST, REQUESTS_SUCCESS, REQUESTS_FAILURE ],
      endpoint,
      schema: Schemas.REQUEST_ARRAY,
      reference
    }
  }
}

function fetchRequests(regionId) {
  return fetchRequestsBase(`regions/${ regionId }/requests`, { key : `regions.${ regionId }.requests` });
}

function fetchUserRequests() {
  return fetchRequestsBase(`me/requests`, { key: "my.requests" });
}

// Fetches all requests (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadRequests(regionId, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchRequests(regionId)))
  }
}

export function loadUserRequests(requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchUserRequests()))
  }
}

export const UPDATE_REQUEST_REQUEST = 'UPDATE_REQUEST_REQUEST';
export const UPDATE_REQUEST_SUCCESS = 'UPDATE_REQUEST_SUCCESS';
export const UPDATE_REQUEST_FAILURE = 'UPDATE_REQUEST_FAILURE';

// Fetches user request
// Relies on the custom API middleware defined in ../middleware/api.js.
function putRequest(request) {
  return {
    [CALL_API]: {
      types: [ UPDATE_REQUEST_REQUEST, UPDATE_REQUEST_SUCCESS, UPDATE_REQUEST_FAILURE ],
      endpoint: `requests/${ request.ID }`,
      verb: 'PUT',
      schema: Schemas.REQUEST,
      payload: request
    }
  }
}

// Fetches user request
// Relies on Redux Thunk middleware.

export function updateRequest(request) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(putRequest(request)))
  }
}