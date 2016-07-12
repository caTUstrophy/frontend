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
  constructor(props) {
    super(props);
    this.state = {chipData: this.props.allowedTags};
    this.styles = {
      chip: {
        margin: 2
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    };
  }

  static propTypes = {
    defaultLocation: LocationPropType,
    allowedTags: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  @autobind
  handleNewTag(chosenRequest, index) {
    const newTag = this.props.allowedTags[index];
    this.props.fields.Tags.addField(newTag);
  }

  handleRequestDelete = (key) => {
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({chipData: this.chipData});
  };

  renderChip(data) {
    return (
      <Chip
        key={data.value}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.value}
      </Chip>
    );
  }

  @autobind
  handleMapClick(event) {
    this.props.fields.Location.onChange(event.latlng);
  }

  render() {
    const {fields: {Name, Tags, Location, ValidityPeriod}, handleSubmit, submitting, invalid, resetForm, pristine} = this.props;
    const dataSource = this.props.allowedTags;
    console.log(Tags, RequestFieldKeys);
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
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={dataSource}
                onNewRequest={this.handleNewTag}
              />
            </div>
            <div style={this.styles.wrapper}>
              {Tags && Tags.map(this.renderChip, this)}
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
  validate: Validation(RequestFields)
})(RequestForm);