import { CALL_API, Schemas } from '../middleware/api'
import {authorized} from "./authorizationHelpers";

export const CREATE_MATCHING_REQUEST = 'CREATE_MATCHING_REQUEST';
export const CREATE_MATCHING_SUCCESS = 'CREATE_MATCHING_SUCCESS';
export const CREATE_MATCHING_FAILURE = 'CREATE_MATCHING_FAILURE';

// Fetches all matchings
// Relies on the custom API middleware defined in ../middleware/api.js.
function sendMatching(matching) {
    return {
        [CALL_API]: {
            types: [ CREATE_MATCHING_REQUEST, CREATE_MATCHING_SUCCESS, CREATE_MATCHING_FAILURE ],
            endpoint: `matchings`,
            verb: 'POST',
            schema: Schemas.MATCHING_ARRAY, // todo: no real response schema?
            payload: matching
        }
    }
}

// Fetches all matchings (unless it is cached)
// Relies on Redux Thunk middleware.
export function createMatching(matching) {
    return (dispatch, getState) => {
        return dispatch(authorized(getState().login.jwt)(sendMatching(matching)))
    }
}

export const MATCHINGS_MATCHING = 'MATCHINGS_MATCHING';
export const MATCHINGS_SUCCESS = 'MATCHINGS_SUCCESS';
export const MATCHINGS_FAILURE = 'MATCHINGS_FAILURE';

// Fetches all matchings
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchMatchings(authorization) {
    return {
        [CALL_API]: {
            types: [ MATCHINGS_MATCHING, MATCHINGS_SUCCESS, MATCHINGS_FAILURE ],
            endpoint: `matchings`,
            schema: Schemas.MATCHING_ARRAY,
            authorization
        }
    }
}

// Fetches all matchings (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadMatchings(requiredFields = []) {
    return (dispatch, getState) => {
        return dispatch(fetchMatchings(getState().login.jwt))
    }
}