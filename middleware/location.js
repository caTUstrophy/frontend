export const GET_LOCATION = 'GET_LOCATION';
export const LOCATION_TYPE_NETWORK = 'LOCATION_TYPE_NETWORK';

const IP_INFO_URL = 'http://ipinfo.io/geo';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callIpInfo(verb, authorization, endpoint, schema, payload) {
  const fullUrl = IP_INFO_URL;

  let request = {
    method: 'GET',
    headers: { },
    mode: 'cors'
  };

  return fetch(fullUrl, request)
    .then(response => {
      return response.json().then(json => ({ json, response }));
    }).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const locationArray = json.loc.split(',').map((value) => parseFloat(value));

      return {
        Lat: locationArray[0],
        Lng: locationArray[1],
        LocationType: LOCATION_TYPE_NETWORK
      }
    })
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  if (typeof action[GET_LOCATION] === 'undefined') {
    return next(action)
  }

  const { locationType, types } = action[GET_LOCATION];
  
  if (locationType == LOCATION_TYPE_NETWORK) {

    const [ requestType, successType, failureType ] = types;
    next(actionWith({type: requestType}));

    function actionWith(data) {
      const finalAction = Object.assign({}, action, data);
      delete finalAction[GET_LOCATION];
      return finalAction;
    }
  
    return callIpInfo().then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => {
        let failureDescription = {
          type: failureType
        };
        failureDescription.errorMessage = error.message || 'Something bad happened: ' + JSON.stringify(error);
        if (!error.message) {
          failureDescription.error = error;
        }
        return next(actionWith(failureDescription))
      }
    )
  } else {
    throw TypeError("Unsupported location type requested: " + action[GET_LOCATION]);
  }
}