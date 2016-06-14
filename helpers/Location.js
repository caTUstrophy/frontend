import { PropTypes } from 'react';

export const LocationPropType = PropTypes.shape({
  Latitude: PropTypes.number,
  Longitude: PropTypes.number
});

export function isLocation(location) {
  return location && location.Latitude && location.Longitude;
}
export function locationToArray(location) {
  return [location.Latitude, location.Longitude];
}

export default {
  LocationPropType,
  locationToArray,
  isLocation
}