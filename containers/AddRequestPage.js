import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {createRequest, CREATE_REQUESTS_SUCCESS} from '../actions/requests'
import RequestForm from '../forms/RequestForm'

import autobind from 'autobind-decorator'

class RequestPage extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  handleSubmit(request) {
    request.ValidityPeriod = request.ValidityPeriod.getTime();
    this.props.createRequest(request)
      .then(e => {
        if (e.type == CREATE_REQUESTS_SUCCESS) {
          browserHistory.push('/admin/requests'); // todo: improve this
        }
      }).catch(e => {
        console.log("Catch", e);
      });
  }

  render() {
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <RequestForm onSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

RequestPage.propTypes = {
  ID: PropTypes.number.isRequired,
  request: PropTypes.object,
  loadRequest: PropTypes.func.isRequired
};

export default connect(null, {
  createRequest
})(RequestPage)
