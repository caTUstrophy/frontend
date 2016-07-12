import { CALL_API, Schemas } from '../middleware/api'
import { authorized } from './authorizationHelpers'

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
      schema: Schemas.OFFER,
      payload: offer
    }
  }
}

// Fetches all offers (unless it is cached)
// Relies on Redux Thunk middleware.
export function createOffer(offer, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(sendOffer(offer)))
  }
}

export const OFFER_REQUEST = 'OFFER_REQUEST';
export const OFFER_SUCCESS = 'OFFER_SUCCESS';
export const OFFER_FAILURE = 'OFFER_FAILURE';

// Fetches a single offer
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchOffer(offerId) {
  return {
    [CALL_API]: {
      types: [ OFFER_REQUEST, OFFER_SUCCESS, OFFER_FAILURE ],
      endpoint: `offers/${offerId}`,
      schema: Schemas.OFFER
    }
  }
}

// Fetches a single offer unless it is cached.
// Relies on Redux Thunk middleware.
export function loadOffer(offerId, requiredFields = []) {
  return (dispatch, getState) => {
    if (__USE_FRONTEND_CACHES__) {
      const offer = getState().entities.offers[offerId];
      if (offer && requiredFields.every(key => offer.hasOwnProperty(key))) {
        return null;
      }
    }

    return dispatch(authorized(getState().login.jwt)(fetchOffer(offerId)));
  }
}

export const OFFERS_REQUEST = 'OFFERS_REQUEST';
export const OFFERS_SUCCESS = 'OFFERS_SUCCESS';
export const OFFERS_FAILURE = 'OFFERS_FAILURE';

// Fetches all offers
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchOffersBase(endpoint, reference) {
  return {
    [CALL_API]: {
      types: [ OFFERS_REQUEST, OFFERS_SUCCESS, OFFERS_FAILURE ],
      endpoint,
      schema: Schemas.OFFER_ARRAY,
      reference
    }
  }
}

function fetchOffers(regionId) {
  return fetchOffersBase(`regions/${ regionId }/offers`)
}

function fetchUserOffers() {
  return fetchOffersBase(`me/offers`, {key : "myOffers"})
}

// Fetches all offers (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadOffers(regionId, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchOffers(regionId)))
  }
}

export function loadUserOffers(requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchUserOffers()))
  }
}