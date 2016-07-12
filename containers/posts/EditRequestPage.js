import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import { updateRequest, loadRequest, loadTags, loadRegions, UPDATE_REQUEST_SUCCESS } from '../../actions'
import RequestForm from '../../forms/RequestForm'
import Center from '../layout/Center'
import {LocationPropType} from "../../helpers/Location";

class EditRequestPage extends Component {
  static propTypes = {
    ID: PropTypes.string.isRequired,
    request: PropTypes.object,
    location: LocationPropType,
    
    loadTags: PropTypes.func.isRequired,
    loadRequest: PropTypes.func.isRequired,
    loadRegions: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadRequest(this.props.ID);
    this.props.loadRegions();
    this.props.loadTags();
  }
  
  @autobind
  handleSubmit(request) {
    let extendedRequest = Object.assign({}, this.props.request, request, { ValidityPeriod: request.ValidityPeriod.toISOString()});
    
    this.props.updateRequest(extendedRequest)
      .then(result => {
        if (result.type == UPDATE_REQUEST_SUCCESS) {
          browserHistory.push('/me/requests'); // todo: improve this
        }
      }).catch(e => {
        console.log("Catch", e);
      });
  }

  render() {
    const { request, ID } = this.props;
    if (!request) {
      return <h1><i>Loading request #{ID}...</i></h1>
    }

    return (
      <Center vertical={true}>
        <RequestForm request={this.props.request}
                   onSubmit={this.handleSubmit}
                   defaultLocation={this.props.location}
                   regions={this.props.regions}
                   allowedTags={this.props.tags}  />
      </Center>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { ID } = ownProps.params;
  let request = state.entities.requests[ID];
  if (request) {
    request = Object.assign({}, request, {
      Tags: request.Tags.map(({Name}) => Name),
      ValidityPeriod: new Date(request.ValidityPeriod)
    });
  }

  return {
    ID,
    request,
    location: state.location,
    regions: Object.values(state.entities.regions),
    tags: Object.values(state.entities.tags)
  }
}

export default connect(mapStateToProps, {
  loadRequest,
  loadTags,
  loadRegions,
  updateRequest
})(EditRequestPage)
