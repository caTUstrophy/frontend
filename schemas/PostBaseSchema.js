import { PropTypes } from 'react';
import BaseSchema from './BaseSchema';

import { LocationPropType } from '../helpers/Location'

export const PostBaseSchema = Object.assign({}, BaseSchema, {
  Name: {
    propType: PropTypes.string,
    required: true,
    error: "Please provide a name"
  },
  Tags: {
    required: true,
    type: Array
  },
  Location: {
    propType: LocationPropType,
    required: true,
    error: "Please specify a location"
  },
  ValidityPeriod: {
    required: true,
    error: "Please choose a validity period"
  }
});

export default PostBaseSchema