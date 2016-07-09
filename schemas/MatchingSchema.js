import { PropTypes } from 'react';
import PostBaseSchema from './PostBaseSchema'
import schemaAsPropType from './helpers/schemaAsPropType'
import schemaAsFields from './helpers/schemaAsFields'

export const MatchingSchema = Object.assign({}, PostBaseSchema);

export const MatchingPropType = schemaAsPropType(MatchingSchema);
export const MatchingFields = schemaAsFields(MatchingSchema);