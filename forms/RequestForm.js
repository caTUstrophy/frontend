import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';

import autobind from 'autobind-decorator';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'

import { Polygon } from 'react-leaflet';
import SimpleMap from '../components/maps/SimpleMap';
import { LocationPropType } from "../helpers/Location";

import { RequestFields, RequestFieldKeys } from '../schemas/RequestSchema'
import Validation from "./helpers/Validation";

export class RequestForm extends Component {
  static propTypes = {
    defaultLocation: LocationPropType,
    allowedTags: PropTypes.arrayOf(PropTypes.string).isRequired
  };
  
  @autobind
  tagFilter(searchText, key) {
    if (this.props.fields.Tags.some(({ value }) => value == key)) {
      return false;
    }
    
    return AutoComplete.caseInsensitiveFilter(searchText, key);
  }
  
  @autobind
  handleNewTag(chosenRequest, index) {
    if (index === -1) {
      return;
    }
    
    this.props.fields.Tags.addField(chosenRequest);
  }

  handleRequestDelete = (index) => {
    this.props.fields.Tags.removeField(index);
  };

  @autobind
  handleMapClick(event) {
    this.props.fields.Location.onChange(event.latlng);
  }

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
              <AutoComplete
                floatingLabelText="Add relevant tags"
                openOnFocus={true}
                filter={this.tagFilter}
                dataSource={this.props.allowedTags}
                onNewRequest={this.handleNewTag}
                onKeyDown={(event) => event.which == 13 && event.preventDefault() /* this is a hack to prevent form submission on invalid inputs, pressing enter on valid inputs fires 40 (not 13) */} />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {Tags && Tags.map((tag, tagIndex) =>
                <Chip key={tag.value}
                      onRequestDelete={this.handleRequestDelete.bind(this, tagIndex)}
                      style={{margin: 2}}>
                  {tag.value}
                </Chip>
              )}
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
  fields: RequestFieldKeys,
  // validate: Validation(RequestFields)
})(RequestForm);