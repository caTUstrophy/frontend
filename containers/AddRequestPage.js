import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createRequest } from '../actions/requests'
import RequestForm from '../forms/RequestForm'

import autobind from 'autobind-decorator'

class RequestPage extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  handleSubmit(request) {
    request.Deadline = request.Deadline.getTime();
    this.props.createRequest(request)
      .then(e => {
        console.log("Then", e);
        // todo: on actual success transfer to a relevant page
      }).catch(e => {
      console.log("Catch", e);
    });
  }

  render() {
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <RequestForm onSubmit={this.handleSubmit} />
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
