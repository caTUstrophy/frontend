import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'

import toPairsIn from 'lodash/toPairsIn'

export const Fields = {
  FirstName : {
    required: true
  },
  LastName : {
    required: true
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
    ]
  }
};

const validate = values => {
  const errors = {};
  toPairsIn(Fields).forEach(([key, validations]) => {
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

export class UserForm extends Component {
  render() {
    const { fields: { FirstName, LastName, Mail, Password }, resetForm, handleSubmit, submitting, invalid, pristine} = this.props;
    const flexBetweenStyle = {display: 'flex', justifyContent: 'space-around'};
    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader style={{backgroundColor: 'lightgray'}}
                      title="Create user" />
          <CardText>
            <div style={flexBetweenStyle}>
              <TextField {...FirstName}
                  floatingLabelText="First Name"
                  errorText={FirstName.touched && FirstName.error} />
              <TextField {...LastName}
                  floatingLabelText="Last Name"
                  errorText={LastName.touched && LastName.error} />
            </div>
            <div style={flexBetweenStyle}>
              <TextField {...Mail}
                  type="email"
                  floatingLabelText="Email"
                  errorText={Mail.touched && Mail.error} />
              <TextField {...Password}
                  type="password"
                  floatingLabelText="Password"
                  errorText={Password.touched && Password.error}/>
            </div>
          </CardText>

          <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
            {/* everything is revered with flex-direction, because the submit button should come first (in DOM) */}
            <FlatButton label="Submit" disabled={invalid || submitting} style={{marginLeft: 'auto'}} type="submit" />
            <FlatButton label="Reset" disabled={pristine || submitting} onTouchTap={resetForm} />
            <FlatButton label="Cancel" disabled={submitting} onTouchTap={() => browserHistory.push('/users')} />
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default reduxForm({
  form: 'user-form',
  fields: Object.keys(Fields),
  validate
})(UserForm);