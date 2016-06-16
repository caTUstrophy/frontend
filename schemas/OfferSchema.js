import { PropTypes } from 'react';
import PostBaseSchema from './PostBaseSchema'
import schemaAsPropType from './helpers/schemaAsPropType'
import schemaAsFields from './helpers/schemaAsFields'

export const OfferSchema = Object.assign({}, PostBaseSchema);

export const OfferPropType = schemaAsPropType(OfferSchema);
export const OfferFields = schemaAsFields(OfferSchema);