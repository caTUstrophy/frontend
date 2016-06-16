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
  Area: {
    required: true
  }
});

export const RegionPropType = schemaAsPropType(RegionSchema);
export const RegionFields = schemaAsFields(RegionSchema);