import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';

import autobind from 'autobind-decorator';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'

import { Polygon } from 'react-leaflet';
import SimpleMap from '../components/maps/SimpleMap';
import { LocationPropType } from "../helpers/Location";

import { RequestFields } from '../schemas/RequestSchema'
import Validation from "./helpers/Validation";

export class RequestForm extends Component {
  static propTypes = {
    defaultLocation: LocationPropType
  };

  @autobind
  handleMapClick(event) {
    this.props.fields.Location.onChange(event.latlng);
  }

  render() {
    const {fields: {Name, Description, Tags, Location, ValidityPeriod, Radius}, handleSubmit, submitting, invalid, resetForm, pristine} = this.props;

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
              <TextField {...Description}
                ref="Description"
                type="text"
                multLine={true}
                rowsMax={4}
                floatingLabelText="Add a description"
                errorText={Description.touched && Description.error}/>
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
              <DatePicker {...ValidityPeriod}
                hintText="ValidityPeriod"
                container="inline"
                mode="landscape"
                autoOk={true}
                minDate={new Date()}
                onChange={(event, value) => ValidityPeriod.onChange(value)}/>
            </div>
            <div>
              <TextField
                ref="Radius"
                type="text"
                floatingLabelText="Specify a radius in km"
                errorText={Radius.touched && Radius.error}
                onChange={(event, value) => Radius.onChange(parseFloat(value))} />
            </div>
          </CardText>

          <SimpleMap style={{height: '200px'}}
                     onClick={this.handleMapClick}
                     center={this.props.defaultLocation}
                     marker={Location.value || null}>
            {this.props.regions && this.props.regions.map(region => <Polygon positions={region.Boundaries.Points} key={region.ID} />)}
          </SimpleMap>

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
  fields: Object.keys(RequestFields),
  validate: Validation(RequestFields)
})(RequestForm);