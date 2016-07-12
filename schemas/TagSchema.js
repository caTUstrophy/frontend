import { PropTypes } from 'react';

import schemaAsPropType from './helpers/schemaAsPropType'
import schemaAsFields from './helpers/schemaAsFields'

export const TagSchema = {
  Name: {
    propType: PropTypes.string,
    required: true
  }
};

export const TagPropType = schemaAsPropType(TagSchema);
export const TagFields = schemaAsFields(TagSchema);