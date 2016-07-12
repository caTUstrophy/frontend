import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import autobind from 'autobind-decorator'

import {createRequest, CREATE_REQUESTS_SUCCESS} from '../actions/requests'
import { getLocation, loadRegions } from '../actions'
import { loadTags } from '../actions/tags.js'
import RequestForm from '../forms/RequestForm'
import { LocationPropType } from '../helpers/Location'

class AddRequestPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getLocation();
    this.props.loadRegions();
    this.props.loadTags();
  }

  @autobind
  handleSubmit(request) {
    request.ValidityPeriod = request.ValidityPeriod.toISOString();
    
    this.props.createRequest(request)
      .then(response => {
        if (response.type == CREATE_REQUESTS_SUCCESS) {
          browserHistory.push('/me/requests'); // todo: improve this
        }
      }).catch(e => {
      console.log("Catch", e);
    });
  }

  render() {
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <RequestForm onSubmit={this.handleSubmit}
                     defaultLocation={this.props.location}
                     regions={this.props.regions}
                     allowedTags={this.props.tags} />
      </div>
    )
  }
}

AddRequestPage.propTypes = {
  request: PropTypes.object,
  location: LocationPropType,
  loadTags: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.location,
    regions: Object.values(state.entities.regions),
    tags: Object.values(state.entities.tags)
  }
};

export default connect(mapStateToProps, {
  createRequest,
  getLocation,
  loadRegions,
  loadTags
})(AddRequestPage)