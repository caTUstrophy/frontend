import toPairsIn from 'lodash/toPairsIn'

export default function Validation(fields) {
  return (values) => {
    const errors = {};
    toPairsIn(fields).forEach(([key, validations]) => {
      if (validations.required && !values[key]) {
        errors[key] = 'Required';
      } else if (validations.regExp && !validations.regExp.pattern.test(values[key])) {
        errors[key] = validations.regExp.error;
      } else if (validations.custom) {
        for (let customValidation of validations.custom) {
          if (!customValidation.test(values[key])) {
            errors[key] = customValidation.error;
            break;
          }
        }
      }
    });
    return errors;
  };
}