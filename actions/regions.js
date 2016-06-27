import { CALL_API, Schemas } from '../middleware/api'
import { authorized } from './authorizationHelpers'

export const CREATE_REGION_REQUEST = 'CREATE_REGION_REQUEST';
export const CREATE_REGION_SUCCESS = 'CREATE_REGION_SUCCESS';
export const CREATE_REGION_FAILURE = 'CREATE_REGION_FAILURE';

// Fetches all regions
// Relies on the custom API middleware defined in ../middleware/api.js.
function sendRegion(region) {
  return {
    [CALL_API]: {
      types: [ CREATE_REGION_REQUEST, CREATE_REGION_SUCCESS, CREATE_REGION_FAILURE ],
      endpoint: `regions`,
      verb: 'POST',
      schema: Schemas.REGION,
      payload: region
    }
  }
}

// Fetches all regions (unless it is cached)
// Relies on Redux Thunk middleware.
export function createRegion(region, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(sendRegion(region)))
  }
}

export const REGION_REQUEST = 'REGION_REQUEST';
export const REGION_SUCCESS = 'REGION_SUCCESS';
export const REGION_FAILURE = 'REGION_FAILURE';

// Fetches a single region
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRegion(regionId) {
  return {
    [CALL_API]: {
      types: [ REGION_REQUEST, REGION_SUCCESS, REGION_FAILURE ],
      endpoint: `regions/${regionId}`,
      schema: Schemas.REGION
    }
  }
}

// Fetches a single region unless it is cached.
// Relies on Redux Thunk middleware.
export function loadRegion(regionId, requiredFields = []) {
  return (dispatch, getState) => {
    if (__USE_FRONTEND_CACHES__) {
      const region = getState().entities.regions[regionId];
      if (region && requiredFields.every(key => region.hasOwnProperty(key))) {
        return null;
      }
    }
    
    return dispatch(authorized(getState().login.jwt)(fetchRegion(regionId)));
  }
}

export const REGIONS_REQUEST = 'REGIONS_REQUEST';
export const REGIONS_SUCCESS = 'REGIONS_SUCCESS';
export const REGIONS_FAILURE = 'REGIONS_FAILURE';

// Fetches all regions
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRegions() {
  return {
    [CALL_API]: {
      types: [ REGIONS_REQUEST, REGIONS_SUCCESS, REGIONS_FAILURE ],
      endpoint: `regions`,
      schema: Schemas.REGION_ARRAY
    }
  }
}

// Fetches all regions (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadRegions(requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchRegions()))
  }
}