import { CALL_API, Schemas } from '../middleware/api'

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
        return dispatch(sendRequest(request))
    }
}
export const REQUESTS_REQUEST = 'REQUESTS_REQUEST';
export const REQUESTS_SUCCESS = 'REQUESTS_SUCCESS';
export const REQUESTS_FAILURE = 'REQUESTS_FAILURE';

// Fetches all requests
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRequests() {
    return {
        [CALL_API]: {
            types: [ REQUESTS_REQUEST, REQUESTS_SUCCESS, REQUESTS_FAILURE ],
            endpoint: `requests`,
            schema: Schemas.REQUEST_ARRAY
        }
    }
}

// Fetches all requests (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadRequests(requiredFields = []) {
    return (dispatch, getState) => {
        return dispatch(fetchRequests())
    }
}