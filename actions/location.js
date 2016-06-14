import { GET_LOCATION, LOCATION_TYPE_NETWORK } from '../middleware/location';

export const LOCATION_REQUEST = 'LOCATION_REQUEST';
export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const LOCATION_FAILURE = 'LOCATION_FAILURE';

// Relies on the custom API middleware defined in ../middleware/api.js.
function sendLocation(locationType) {
  return {
    [GET_LOCATION]: {
      locationType: locationType,
      types: [ LOCATION_REQUEST, LOCATION_SUCCESS, LOCATION_FAILURE ]
    }
  }
}

// Relies on Redux Thunk middleware.
export function getLocation(preferredLocationType = LOCATION_TYPE_NETWORK) {
  return (dispatch, getState) => {
    return dispatch(sendLocation(preferredLocationType))
  }
}