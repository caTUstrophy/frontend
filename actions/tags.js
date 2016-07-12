import { CALL_API, Schemas } from '../middleware/api'
import { authorized } from './authorizationHelpers'

export const TAGS_REQUEST = 'TAGS_REQUEST';
export const TAGS_SUCCESS = 'TAGS_SUCCESS';
export const TAGS_FAILURE = 'TAGS_FAILURE';

// Fetches all tags
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchTags() {
  return {
    [CALL_API]: {
      types: [ TAGS_REQUEST, TAGS_SUCCESS, TAGS_FAILURE ],
      endpoint: `tags`,
      schema: Schemas.TAG_ARRAY
    }
  }
}

// Fetches all tags (unless it is cached)
// Relies on Redux Thunk middleware.
export function loadTags(requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(authorized(getState().login.jwt)(fetchTags()))
  }
}