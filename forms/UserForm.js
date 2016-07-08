import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

import autobind from 'autobind-decorator';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Checkbox from 'material-ui/Checkbox';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'

import { UserFields, UserFieldKeys } from '../schemas/UserSchema'
import Validation from './helpers/Validation'

import ErrorMessage from './helpers/ErrorMessage'

export class UserForm extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.initializeForm(this.props.user);
    }
  }

  @autobind
  handleAddPhoneNumber() {
    this.props.fields.PhoneNumbers.addField('');
  }

  handleRemovePhoneNumber(index) {
    this.props.fields.PhoneNumbers.removeField(index);
  }

  render() {
    const { fields: { Name, PreferredName, Mail, Password, IsConsentGiven, PhoneNumbers }, resetForm, handleSubmit, submitting, invalid, pristine} = this.props;

    const flexBetweenStyle = {display: 'flex', justifyContent: 'space-around'};
    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader style={{backgroundColor: 'lightgray'}}
                      title="Create user" />
          <CardText>
            <div className="row align-spaced">
              <div className="medium-5 small-12 column">
                <TextField {...Name}
                    ref="Name"
                    floatingLabelText="Full Name"
                    errorText={Name.touched && Name.error} />
              </div>
              <div className="medium-5 small-12 column">
                <TextField {...PreferredName}
                    ref="PreferredName"
                    floatingLabelText="Preferred Name"
                    placeholder="Preferred Name (optional)"
                    errorText={PreferredName.touched && PreferredName.error} />
              </div>
            </div>
            <div style={Object.assign({}, flexBetweenStyle, { alignItems: 'baseline', flexWrap: 'wrap' })}>
              {PhoneNumbers && PhoneNumbers.map((PhoneNumber, index) =>
                <div style={{display: 'flex', alignItems: 'baseline'}} key={index}>
                  <TextField {...PhoneNumber}
                    ref={`PhoneNumbers${ index }`}
                    type="tel"
                    floatingLabelText="Phone"
                    errorText={PhoneNumber.touched && PhoneNumber.error} />

                  <IconButton tooltip="Delete phone number" onTouchTap={this.handleRemovePhoneNumber.bind(this, index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
              <FlatButton label="Add phone number" onTouchTap={this.handleAddPhoneNumber} />
            </div>
            <div className="row align-spaced">
              <div className="medium-5 small-12 column">
                <TextField {...Mail}
                    ref="Mail"
                    type="email"
                    floatingLabelText="Email"
                    errorText={Mail.touched && Mail.error} />
              </div>
              <div className="medium-5 small-12 column">
                {this.props.user ? null :
                  <TextField {...Password}
                      ref="Password"
                      type="password"
                      floatingLabelText="Password"
                      errorText={Password.touched && Password.error}/>}
              </div>
            </div>

            {this.props.user ? null :
              <div style={{marginTop: '2rem'}}>
                <Checkbox
                  label="Allow CaTUstrophy to share your contact details (email, phone number) with other members in case of a match"
                  checked={IsConsentGiven.value === true}
                  onCheck={(event, value) => { IsConsentGiven.onChange(value); IsConsentGiven.onBlur(); } }/>
                <ErrorMessage field={IsConsentGiven}/>
              </div>
            }
          </CardText>

          <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
            {/* everything is revered with flex-direction, because the submit button should come first (in DOM) */}
            <FlatButton ref="submit"
                        label={this.props.user ? "Update" : "Sign up"}
                        disabled={invalid || submitting}
                        style={{marginLeft: 'auto'}}
                        type="submit" />
            {this.props.user ? null :
              <FlatButton label="Reset" disabled={pristine || submitting} onTouchTap={resetForm}/>
            }
            <FlatButton label="Cancel" disabled={submitting} onTouchTap={() => browserHistory.goBack()} />
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default reduxForm({
  form: 'user-form',
  fields: UserFieldKeys,
  validate: Validation(UserFields, 'user')
})(UserForm);