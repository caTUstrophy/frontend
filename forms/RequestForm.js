import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'

import toPairsIn from 'lodash/toPairsIn'

export const Fields = {
  Title: {
    required: true,
    error: "Please provide a title"
  },
  Tags: {
    required: false,
    regExp: {
      pattern: /^[a-zA-Z0-9,. ]+$/,
      error: ("Invalid tag")
    }
  },
  Location: {
    required: true,
    regExp: {
      pattern: /^[a-zA-Z0-9,. ]+$/,
      error: ("Invalid location")
    },
    error: "Missing location"
  },
  Deadline: { // Not working
    required: false,
    error: "Please choose a deadline"
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

export class RequestForm extends Component {
  render() {
    const {fields: {Title, Tags, Location, Deadline}, handleSubmit, submitting, invalid} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader style={{backgroundColor: 'lightgray'}}
                      title="Create request"/>
          <CardText>
            <div>
              <TextField {...Title}
                ref="Title"
                type="text"
                floatingLabelText="What are you requesting?"
                errorText={Title.touched && Title.error}/>
            </div>
            <div>
              <TextField {...Tags}
                ref="Tags"
                type="text"
                disabled={true}
                floatingLabelText="Add relevant tags"
                errorText={Tags.touched && Tags.error}/>
            </div>
            <div>
              <TextField {...Location}
                ref="Location"
                type="text"
                floatingLabelText="Location"
                errorText={Location.touched && Location.error}/>
            </div>
            <div>
              <DatePicker {...Deadline}
                hintText="Deadline"
                container="inline"
                mode="landscape"
                autoOk="true"
                onChange={(event, value) => Deadline.onChange(value)}/>
            </div>
          </CardText>

          <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
            {/* everything is reversed with flex-direction, because the submit button should come first (in DOM) */}
            <FlatButton ref="submit" label="Create request" disabled={invalid || submitting} style={{marginLeft: 'auto'}}
                        type="submit"/>
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default reduxForm({
  form: 'request-form',
  fields: Object.keys(Fields),
  validate
})(RequestForm);