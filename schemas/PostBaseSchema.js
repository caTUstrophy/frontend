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
  Description: {
    propType: PropTypes.string,
    required: false
  },
  Location: {
    propType: LocationPropType,
    required: true,
    error: "Please specify a location"
  },
  ValidityPeriod: {
    required: true,
    error: "Please choose a validity period"
  },
  Radius: {
    propType: PropTypes.number,
    required: true,
    error: "Please specify a radius"
  }
});

export default PostBaseSchema