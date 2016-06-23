import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'

import { UserFields } from '../schemas/UserSchema'
import Validation from './helpers/Validation'

export class UserForm extends Component {
  render() {
    const { fields: { Name, PreferredName, Mail, Password }, resetForm, handleSubmit, submitting, invalid, pristine} = this.props;

    const flexBetweenStyle = {display: 'flex', justifyContent: 'space-around'};
    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader style={{backgroundColor: 'lightgray'}}
                      title="Create user" />
          <CardText>
            <div style={flexBetweenStyle}>
              <TextField {...Name}
                  ref="Name"
                  floatingLabelText="Full Name"
                  errorText={Name.touched && Name.error} />
              <TextField {...PreferredName}
                  ref="PreferredName"
                  floatingLabelText="Preferred Name"
                  placeholder="Preferred Name (optional)"
                  errorText={PreferredName.touched && PreferredName.error} />
            </div>
            <div style={flexBetweenStyle}>
              <TextField {...Mail}
                  ref="Mail"
                  type="email"
                  floatingLabelText="Email"
                  errorText={Mail.touched && Mail.error} />
              <TextField {...Password}
                  ref="Password"
                  type="password"
                  floatingLabelText="Password"
                  errorText={Password.touched && Password.error}/>
            </div>
          </CardText>

          <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
            {/* everything is revered with flex-direction, because the submit button should come first (in DOM) */}
            <FlatButton ref="submit" label="Submit" disabled={invalid || submitting} style={{marginLeft: 'auto'}} type="submit" />
            <FlatButton label="Reset" disabled={pristine || submitting} onTouchTap={resetForm} />
            <FlatButton label="Cancel" disabled={submitting} onTouchTap={() => browserHistory.goBack()} />
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default reduxForm({
  form: 'user-form',
  fields: Object.keys(UserFields),
  validate: Validation(UserFields)
})(UserForm);