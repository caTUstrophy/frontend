import { PropTypes } from 'react';

export default function schemaAsFieldKeys(schema) {
  let fieldKeys = [];
  for (let property in schema) {
    if (!schema.hasOwnProperty(property)) {
      continue;
    }

    if (!(schema[property].hasOwnProperty('userDefined') && !schema[property].userDefined)) {
      let fieldName = property;
      if (schema[property].type === Array) {
        fieldName += '[]';
      }
      fieldKeys.push(fieldName);
    }
  }

  return fieldKeys;
}