import { CALL_API, Schemas } from '../middleware/api'
import {authorized} from "./authorizationHelpers";

export const CREATE_MATCHING_REQUEST = 'CREATE_MATCHING_REQUEST';
export const CREATE_MATCHING_SUCCESS = 'CREATE_MATCHING_SUCCESS';
export const CREATE_MATCHING_FAILURE = 'CREATE_MATCHING_FAILURE';

// Fetches all matchings
// Relies on the custom API middleware defined in ../middleware/api.js.
function sendMatching(regionId, requestId, offerId) {
    return {
        [CALL_API]: {
            types: [ CREATE_MATCHING_REQUEST, CREATE_MATCHING_SUCCESS, CREATE_MATCHING_FAILURE ],
            endpoint: `matchings`,
            verb: 'POST',
            schema: Schemas.MATCHING,
            payload: {
                Region: regionId,
                Request: requestId,
                Offer: offerId
            }
        }
    }
}

// Fetches all matchings (unless it is cached)
// Relies on Redux Thunk middleware.
export function createMatching(regionId, requestId, offerId) {
    return (dispatch, getState) => {
        return dispatch(authorized(getState().login.jwt)(sendMatching(regionId, requestId, offerId)))
    }
}

export const MATCHING_REQUEST = 'MATCHING_REQUEST';
export const MATCHING_SUCCESS = 'MATCHING_SUCCESS';
export const MATCHING_FAILURE = 'MATCHING_FAILURE';

// Fetches a single matching
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchMatching(matchingId) {
    return {
        [CALL_API]: {
            types: [ MATCHING_REQUEST, MATCHING_SUCCESS, MATCHING_FAILURE ],
            endpoint: `matchings/${matchingId}`,
            schema: Schemas.MATCHING
        }
    }
}

// Fetches a single matching unless it is cached.
// Relies on Redux Thunk middleware.
export function loadMatching(matchingId, requiredFields = []) {
    return (dispatch, getState) => {
        if (__USE_FRONTEND_CACHES__) {
            const matching = getState().entities.matchings[matchingId];
            if (matching && requiredFields.every(key => matching.hasOwnProperty(key))) {
                return null;
            }
        }

        return dispatch(authorized(getState().login.jwt)(fetchMatching(matchingId)));
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
            endpoint: `me/matchings`,
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

export function loadUserMatchings(requiredFields = []) {
    return (dispatch, getState) => {
        return dispatch(authorized(getState().login.jwt)(fetchMatchings()))
    }
}