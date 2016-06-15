import { PropTypes } from 'react';
import schemaAsPropType from './helpers/schemaAsPropType'
import schemaAsFields from './helpers/schemaAsFields'

export const RegionSchema = {
  ID: {
    propType: PropTypes.string,
    required: true,
    userDefined: false
  },
  Name: {
    propType: PropTypes.string,
    required: true,
    error: "Please provide a name"
  },
  Area: {
    required: true
  }
};

export const RegionPropType = schemaAsPropType(RegionSchema);
export const RegionFields = schemaAsFields(RegionSchema);