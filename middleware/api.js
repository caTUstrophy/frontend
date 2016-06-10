import { Schema, arrayOf, normalize } from 'normalizr'

// Extracts the next page URL from Github API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

const API_ROOT = 'http://localhost:3001/';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(verb, authorization, endpoint, schema, payload) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  let request = {
    method: verb,
    headers: { }
  };

  if (authorization) {
    request.mode = 'cors';
    request.headers['Authorization'] = `Bearer ${authorization}`;
  }

  if (payload) {
    // todo: support non-JSON payload?
    request.body = JSON.stringify(payload);
  }

  return fetch(fullUrl, request)
    .then(response => {
      if (response.status === 401) {
        return Promise.reject({ message: "Unauthorized" });
      }

      return response.json().then(json => ({ json, response }));
    }).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const nextPageUrl = getNextPageUrl(response);

      if (!schema) {
        return json;
      }

      return Object.assign({},
        normalize(json, schema),
        { nextPageUrl }
      )
    })
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

const userSchema = new Schema('users', {
  idAttribute: user => user.ID
});

const offerSchema = new Schema('offers', {
  idAttribute: offer => offer.ID
});

const requestSchema = new Schema('requests', {
  idAttribute: request => request.ID
});

const matchingSchema = new Schema('matchings', {
  idAttribute: matching => matching.ID
});

// Schemas for Github API responses.
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  OFFER: offerSchema,
  OFFER_ARRAY: arrayOf(offerSchema),
  REQUEST: requestSchema,
  REQUEST_ARRAY: arrayOf(requestSchema),
  MATCHING: matchingSchema,
  MATCHING_ARRAY: arrayOf(matchingSchema)
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, verb, payload } = callAPI;
  const { schema, types, authorization } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (typeof verb === 'undefined') {
    verb = 'GET'
  }

  if (schema) {
    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
      throw new Error('Expected action types to be strings.')
    }
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(verb, authorization, endpoint, schema, payload).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened: ' + JSON.stringify(error)
    }))
  )
}
