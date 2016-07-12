import { PropTypes } from 'react';

export const LocationPropType = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number
});

export function isLocation(location) {
  return location && location.lat && location.lng;
}

function toArcMinutes(decimalDegrees) {
  let degrees = Math.floor(decimalDegrees);
  let minutes = Math.floor((decimalDegrees - degrees) * 60);
  let seconds = Math.floor((decimalDegrees - degrees - minutes / 60) * 60 * 60);
  return `${degrees}°${minutes}'${seconds}"`;
}
export function toString(location) {
  return `${toArcMinutes(location.lat)}${location.lat > 0 ? 'N' : 'S'} ${toArcMinutes(location.lng)}${location.lng > 0 ? 'E' : 'W'}`;
}

export function calculateCenter(arrayOfLocations) {
  return {
    lat: arrayOfLocations.map(point => point.lat).reduce((a, b) => a + b) / arrayOfLocations.length,
    lng: arrayOfLocations.map(point => point.lng).reduce((a, b) => a + b) / arrayOfLocations.length
  }
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
      area += ((p2.lng - p1.lng) * d2r) *
        (2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
    }
    area = area * 6378137.0 * 6378137.0 / 2.0;
  }

  return Math.abs(area);
}

export default {
  LocationPropType,
  isLocation,
  calculateCenter
}