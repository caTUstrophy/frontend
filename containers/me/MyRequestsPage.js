import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { loadUserRequests } from '../../actions/requests'
import RequestList from '../../components/RequestList'

class MyRequestsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadUserRequests()
  }

  render() {
    const { requests } = this.props;
    if (!requests) {
      return <h1><i>Loading your requests...</i></h1>
    }

    return (
      <div>
        <h1>Your Requests</h1>
        <RequestList requests={requests} onTouchTapItem={(request) => browserHistory.push(`/me/requests/${ request.ID }`)} />
      </div>
    )
  }
}

MyRequestsPage.propTypes = {
  requests: PropTypes.array.isRequired,
  loadUserRequests: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { requests } } = state;

  return {
    requests: Object.values(requests)
  }
}

export default connect(mapStateToProps, {
  loadUserRequests
})(MyRequestsPage)