import { CALL_API, Schemas } from '../middleware/api'

export const CREATE_OFFERS_REQUEST = 'CREATE_OFFERS_REQUEST';
export const CREATE_OFFERS_SUCCESS = 'CREATE_OFFERS_SUCCESS';
export const CREATE_OFFERS_FAILURE = 'CREATE_OFFERS_FAILURE';

// Fetches all offers
// Relies on the custom API middleware defined in ../middleware/api.js.
function sendOffer(offer) {
    return {
        [CALL_API]: {
            types: [ CREATE_OFFERS_REQUEST, CREATE_OFFERS_SUCCESS, CREATE_OFFERS_FAILURE ],
            endpoint: `offers`,
            verb: 'POST',
            schema: Schemas.OFFER_ARRAY, // todo: no real response schema?
            payload: offer
        }
    }
}

// Fetches all offers (unless it is cached)
// Relies on Redux Thunk middleware.
export function createOffer(offer, requiredFields = []) {
    return (dispatch, getState) => {
        return dispatch(sendOffer(offer))
    }
}

export const OFFERS_REQUEST = 'OFFERS_REQUEST';
export const OFFERS_SUCCESS = 'OFFERS_SUCCESS';
export const OFFERS_FAILURE = 'OFFERS_FAILURE';

// Fetches all offers
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchOffers(authorization) {
    return {
        [CALL_API]: {
            types: [ OFFERS_REQUEST, OFFERS_SUCCESS, OFFERS_FAILURE ],
            endpoint: `offers`,
            schema: Schemas.OFFER_ARRAY,
            authorization
        }
    }
}

// Fetches all offers (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadOffers(requiredFields = []) {
    return (dispatch, getState) => {
        return dispatch(fetchOffers(getState().login.jwt))
    }
}