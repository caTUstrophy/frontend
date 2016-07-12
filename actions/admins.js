import { CALL_API, Schemas } from '../middleware/api'
import { authorized } from './authorizationHelpers'

export const PROMOTE_ADMIN_REQUEST = 'PROMOTE_ADMIN_REQUEST';
export const PROMOTE_ADMIN_SUCCESS = 'PROMOTE_ADMIN_SUCCESS';
export const PROMOTE_ADMIN_FAILURE = 'PROMOTE_ADMIN_FAILURE';

// Fetches all admins
// Relies on the custom API middleware defined in ../middleware/api.js.
function sendAdminPromotion(adminMail, regionId) {
  return {
    [CALL_API]: {
      types: [ PROMOTE_ADMIN_REQUEST, PROMOTE_ADMIN_SUCCESS, PROMOTE_ADMIN_FAILURE ],
      endpoint: `regions/${regionId}/admins`,
      verb: 'POST',
      schema: Schemas.USER, // todo: update region admins
      payload: { Mail: adminMail }
    }
  }
}

// Fetches all admins (unless it is cached)
// Relies on Redux Thunk middleware.
export function promoteAdmin(adminMail, regionId) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(sendAdminPromotion(adminMail, regionId)))
  }
}

export const ADMINS_REQUEST = 'ADMINS_REQUEST';
export const ADMINS_SUCCESS = 'ADMINS_SUCCESS';
export const ADMINS_FAILURE = 'ADMINS_FAILURE';

// Fetches all admins
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchAdminsBase(endpoint, reference) {
  return {
    [CALL_API]: {
      types: [ ADMINS_REQUEST, ADMINS_SUCCESS, ADMINS_FAILURE ],
      endpoint,
      schema: Schemas.USER_ARRAY,
      reference
    }
  }
}

function fetchRegionAdmins(regionId) {
  return fetchAdminsBase(`regions/${ regionId }/admins`, {regionId});
}

// Fetches all admins (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadRegionAdmins(regionId) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchRegionAdmins(regionId)))
  }
}