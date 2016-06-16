import { PropTypes } from 'react';

export const LocationPropType = PropTypes.shape({
  Lat: PropTypes.number,
  Lng: PropTypes.number
});

export function isLocation(location) {
  return location && location.Lat && location.Lng;
}
export function locationToArray(location) {
  return [location.Lat, location.Lng];
}
export function locationsToArray(locations) {
  return locations.map(locationToArray)
}

// from: https://github.com/Leaflet/Leaflet.draw/blob/master/src/ext/GeometryUtil.js
export function geodesicArea(latLngs) {
  var pointsCount = latLngs.length,
    area = 0.0,
    d2r = Math.PI / 180.0,
    p1, p2;

  if (pointsCount > 2) {
    for (var i = 0; i < pointsCount; i++) {
      p1 = latLngs[i];
      p2 = latLngs[(i + 1) % pointsCount];
      area += ((p2.Lng - p1.Lng) * d2r) *
        (2 + Math.sin(p1.Lat * d2r) + Math.sin(p2.Lat * d2r));
    }
    area = area * 6378137.0 * 6378137.0 / 2.0;
  }

  return Math.abs(area);
}

export default {
  LocationPropType,
  locationToArray,
  locationsToArray,
  isLocation
}