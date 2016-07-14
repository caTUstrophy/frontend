import { CALL_API } from '../middleware/api'
import {authorized} from "./authorizationHelpers";

export const RECOMMENDATIONS_REQUEST = 'RECOMMENDATIONS_REQUEST';
export const RECOMMENDATIONS_SUCCESS = 'RECOMMENDATIONS_SUCCESS';
export const RECOMMENDATIONS_FAILURE = 'RECOMMENDATIONS_FAILURE';

// Fetches all recommendations
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRecommendationsBase(endpoint) {
  return {
    [CALL_API]: {
      types: [ RECOMMENDATIONS_REQUEST, RECOMMENDATIONS_SUCCESS, RECOMMENDATIONS_FAILURE ],
      endpoint
    }
  }
}

function fetchRecommendationsForOffer(regionId, offerId) {
  return fetchRecommendationsBase(`regions/${ regionId }/offers/${ offerId }/recommendations`);
}
function fetchRecommendationsForRequest(regionId, requestId) {
  return fetchRecommendationsBase(`regions/${ regionId }/requests/${ requestId }/recommendations`);
}

// Fetches all recommendations (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadRecommendationsForOffer(regionId, offerId) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchRecommendationsForOffer(regionId, offerId)))
  }
}

export function loadRecommendationsForRequest(regionId, requestId) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchRecommendationsForRequest(regionId, requestId)))
  }
}