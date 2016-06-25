import toPairsIn from 'lodash/toPairsIn'

function validateField(field, validations) {
  if (validations.required && !field) {
    return 'Required';
  } else if (validations.regExp && !validations.regExp.pattern.test(field)) {
    return validations.regExp.error;
  } else if (validations.custom) {
    for (let customValidation of validations.custom) {
      if (!customValidation.test(field)) {
        return customValidation.error;
      }
    }
  }

  return null;
}

export default function Validation(fields) {
  return (values) => {
    const errors = {};
    toPairsIn(fields).forEach(([key, validations]) => {
      if (validations.type === Array) {
        errors[key] = values[key].map(value => validateField(value, validations));
      } else {
        errors[key] = validateField(values[key], validations);
      }
    });
    return errors;
  };
}