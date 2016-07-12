import { PropTypes } from 'react';
import PostBaseSchema from './PostBaseSchema'
import schemaAsPropType from './helpers/schemaAsPropType'
import schemaAsFields from './helpers/schemaAsFields'
import schemaAsFieldKeys from './helpers/schemaAsFieldKeys'

export const RequestSchema = Object.assign({}, PostBaseSchema);

export const RequestPropType = schemaAsPropType(RequestSchema);
export const RequestFields = schemaAsFields(RequestSchema);
export const RequestFieldKeys = schemaAsFieldKeys(RequestSchema);
