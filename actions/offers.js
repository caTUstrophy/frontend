import { CALL_API, Schemas } from '../middleware/api'

export const OFFERS_REQUEST = 'OFFERS_REQUEST';
export const OFFERS_SUCCESS = 'OFFERS_SUCCESS';
export const OFFERS_FAILURE = 'OFFERS_FAILURE';

// Fetches all offers
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchOffers() {
    return {
        [CALL_API]: {
            types: [ OFFERS_REQUEST, OFFERS_SUCCESS, OFFERS_FAILURE ],
            endpoint: `offers`,
            schema: Schemas.OFFER_ARRAY
        }
    }
}

// Fetches all offers (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadOffers(requiredFields = []) {
    return (dispatch, getState) => {
        return dispatch(fetchOffers())
    }
}