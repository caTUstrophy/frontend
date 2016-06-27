import { PropTypes } from 'react';
import BaseSchema from './BaseSchema'
import schemaAsPropType from './helpers/schemaAsPropType'
import schemaAsFields from './helpers/schemaAsFields'

export const RegionSchema = Object.assign({}, BaseSchema, {
  Name: {
    propType: PropTypes.string,
    required: true,
    error: "Please provide a name"
  },
  Description: {
    propType: PropTypes.string,
    required: true,
    error: "Please provide a description"
  },
  Boundaries: {
    // todo: specify nested 'Points' as array of lat/lng
    required: true
  }
});

export const RegionPropType = schemaAsPropType(RegionSchema);
export const RegionFields = schemaAsFields(RegionSchema);