import { PropTypes } from 'react';
import PostBaseSchema from './PostBaseSchema'
import schemaAsPropType from './helpers/schemaAsPropType'
import schemaAsFields from './helpers/schemaAsFields'
import schemaAsFieldKeys from './helpers/schemaAsFieldKeys'

export const OfferSchema = Object.assign({}, PostBaseSchema);

export const OfferPropType = schemaAsPropType(OfferSchema);
export const OfferFields = schemaAsFields(OfferSchema);
export const OfferFieldKeys = schemaAsFieldKeys(OfferSchema);