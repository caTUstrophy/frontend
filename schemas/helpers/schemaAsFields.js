import { PropTypes } from 'react';

export default function schemaAsFields(schema) {
  let fields = {};
  for (let property in schema) {
    if (!schema.hasOwnProperty(property)) {
      continue;
    }

    if (!schema[property].hasOwnProperty('userDefined') || !schema[property].userDefined) {
      fields[property] = Object.assign({}, schema[property]);
      delete fields[property].propType;
    }
  }

  return fields;
}