import { PropTypes } from 'react';
import PostBaseSchema from './PostBaseSchema'
import schemaAsPropType from './helpers/schemaAsPropType'
import schemaAsFields from './helpers/schemaAsFields'

export const NotificationSchema = Object.assign({}, PostBaseSchema);

export const NotificationPropType = schemaAsPropType(NotificationSchema);
export const NotificationFields = schemaAsFields(NotificationSchema);