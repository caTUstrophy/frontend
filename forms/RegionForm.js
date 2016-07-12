import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';

import autobind from 'autobind-decorator';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'

import Validation from "./helpers/Validation";

import { RegionFields, RegionPropType } from "../schemas/RegionSchema"

import FreeDraw from '../components/maps/FreeDraw';
import SimpleMap from '../components/maps/SimpleMap';

import { LocationPropType, fromLeaflet } from "../helpers/Location";

export class RegionForm extends Component {
  static propTypes = {
    defaultLocation: LocationPropType
  };

  componentDidMount() {
    if (this.props.region) {
      this.props.initializeForm(this.props.region);
    }
  }

  @autobind
  handleMarkers(event) {
    this.props.fields.Boundaries.onChange({ Points: event.latLngs[0].map(fromLeaflet) });
  }

  render() {
    const {fields: { Name, Description, Boundaries }, handleSubmit, submitting, invalid, resetForm, pristine} = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader style={{backgroundColor: 'lightgray'}}
                      title={this.props.region ? "Update a region" : "Create a region"}/>
          <CardText>
            <div>
              <TextField {...Name}
                ref="Name"
                type="text"
                floatingLabelText="The region's name"
                errorText={Name.touched && Name.error}/>
            </div>
            <div>
              <TextField {...Description}
                ref="Description"
                type="text"
                multiline={true}
                floatingLabelText="Describe the region"
                errorText={Description.touched && Description.error}/>
            </div>
          </CardText>

          <SimpleMap center={this.props.defaultLocation} style={{height: 400}}>
            <FreeDraw onMarkers={this.handleMarkers}
                      polygon={Boundaries && Boundaries.value.Points} />
          </SimpleMap>
          {/* todo: Area.touched && Area.error */}

          <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
            {/* everything is reversed with flex-direction, because the submit button should come first (in DOM) */}
            <FlatButton ref="submit" label={this.props.region ? "Save" : "Create region"} disabled={invalid || submitting} style={{marginLeft: 'auto'}}
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
  form: 'region-form',
  fields: Object.keys(RegionFields),
  validate: Validation(RegionFields)
})(RegionForm);