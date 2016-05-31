import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'

import toPairsIn from 'lodash/toPairsIn'
import Validation from "./helpers/Validation";

export const Fields = {
  Name: {
    required: true,
    error: "Please provide a name"
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
  ValidityPeriod: {
    required: true,
    error: "Please choose a validity period"
  }
};

export class RequestForm extends Component {
  render() {
    const {fields: {Name, Tags, Location, ValidityPeriod}, handleSubmit, submitting, invalid, resetForm, pristine} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader style={{backgroundColor: 'lightgray'}}
                      title="Create request"/>
          <CardText>
            <div>
              <TextField {...Name}
                ref="Name"
                type="text"
                floatingLabelText="What are you requesting?"
                errorText={Name.touched && Name.error}/>
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
              <DatePicker {...ValidityPeriod}
                hintText="ValidityPeriod"
                container="inline"
                mode="landscape"
                autoOk={true}
                onChange={(event, value) => ValidityPeriod.onChange(value)}/>
            </div>
          </CardText>

          <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
            {/* everything is reversed with flex-direction, because the submit button should come first (in DOM) */}
            <FlatButton ref="submit" label="Create request" disabled={invalid || submitting} style={{marginLeft: 'auto'}}
                        type="submit"/>
            <FlatButton label="Reset" disabled={pristine || submitting} onTouchTap={resetForm} />
            <FlatButton label="Cancel" disabled={submitting} onTouchTap={() => browserHistory.goBack()} />
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default reduxForm({
  form: 'request-form',
  fields: Object.keys(Fields),
  validate: Validation(Fields)
})(RequestForm);