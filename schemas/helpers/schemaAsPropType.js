import { PropTypes } from 'react';

export default function schemaAsPropType(schema) {
  let shape = {};
  for (let property in schema) {
    if (!schema.hasOwnProperty(property)) {
      continue;
    }
    
    shape[property] = schema[property].propType || PropTypes.any;
    if (schema[property].isRequired) {
      shape[property] = shape[property].required;
    }
  }

  return PropTypes.shape(shape);
}