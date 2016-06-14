import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {createRequest, CREATE_REQUESTS_SUCCESS} from '../actions/requests'
import { getLocation } from '../actions/location'
import RequestForm from '../forms/RequestForm'

import autobind from 'autobind-decorator'

class AddRequestPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getLocation();
  }

  @autobind
  handleSubmit(request) {
    request.ValidityPeriod = request.ValidityPeriod.toISOString();
    this.props.createRequest(request)
      .then(response => {
        if (response.type == CREATE_REQUESTS_SUCCESS) {
          browserHistory.push('/requests'); // todo: improve this
        }
      }).catch(e => {
        console.log("Catch", e);
      });
  }

  render() {
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <RequestForm onSubmit={this.handleSubmit} 
                     defaultLocation={this.props.location} />
      </div>
    )
  }
}

AddRequestPage.propTypes = {
  request: PropTypes.object,
  location: PropTypes.object // todo: refine location propType and make common
};

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.location
  }
};

export default connect(mapStateToProps, {
  createRequest,
  getLocation
})(AddRequestPage)
