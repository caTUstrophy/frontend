import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import Validation from './helpers/Validation';

export const Fields = {
  Mail: {
    required: true,
    regExp: {
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      error: 'Not a valid e-mail address'
    }
  }
};

export class InlineEmailForm extends Component {
  static propTypes = {
    submitButtonText: PropTypes.string
  };

  render() {
    const { fields: { Mail }, handleSubmit, submitting, invalid} = this.props;
    return (
      <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'baseline'}}>
        <TextField {...Mail}
          ref="Mail"
          type="email"
          floatingLabelText="Email"
          errorText={Mail.touched && Mail.error} />
        <FlatButton ref="submit" label={this.props.submitButtonText || "Submit"} disabled={invalid || submitting} type="submit" />
      </form>
    );
  }
}

export const INLINE_EMAIL_FORM_ID = 'inline-email-form';

export default reduxForm({
  form: INLINE_EMAIL_FORM_ID,
  fields: Object.keys(Fields),
  validate: Validation(Fields)
})(InlineEmailForm);