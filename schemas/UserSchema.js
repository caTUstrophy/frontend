import { PropTypes } from 'react';
import BaseSchema from './BaseSchema';
import schemaAsPropType from './helpers/schemaAsPropType'
import schemaAsFields from './helpers/schemaAsFields'
import schemaAsFieldKeys from './helpers/schemaAsFieldKeys'

import { PhoneNumberUtil } from 'google-libphonenumber'

var phoneUtil = PhoneNumberUtil.getInstance();

export const UserSchema = Object.assign({}, BaseSchema, {
  Name : {
    required: true
  },
  PreferredName : {
    required: false
  },
  PhoneNumbers : {
    required: true, // currently means that entries in array may not be empty, but array may be empty (no minimum length)
    type: Array,
    custom: [
      {
        test: (value) => {
          if (!value) {
            return true;
          }
          try {
            let phoneNumber = phoneUtil.parse(value);
            return phoneUtil.isValidNumber(phoneNumber);
          } catch (error) {
            return false;
          }
        },
        error: "Not a valid phone number"
      }
    ]
  },
  Mail: {
    required: true,
    regExp: {
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      error: 'Not a valid e-mail address'
    }
  },
  Password: {
    required: true,
    custom: [
      {
        test: (value) => value && value.length > 5,
        error: "Too short"
      }
    ],
    creationOnly: true
  },
  IsConsentGiven: {
    required: true,
    userInterfaceOnly: true,
    creationOnly: true
  }
});

export const UserPropType = schemaAsPropType(UserSchema);
export const UserFields = schemaAsFields(UserSchema);
export const UserFieldKeys = schemaAsFieldKeys(UserSchema);
