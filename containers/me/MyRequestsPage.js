import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { loadUserRequests, REQUESTS_REQUEST } from '../../actions/requests'
import RequestList from '../../components/RequestList'

import loadingHelper from '../helpers/loadingHelper'

import Center from '../layout/Center'
import Loading from '../misc/Loading'

class MyRequestsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadUserRequests()
  }

  @autobind
  handleTouchTapItem(request) {
    browserHistory.push(`/me/requests/${ request.ID }`)
  }

  render() {
    const { requests, loading } = this.props;
    
    if (loading) {
      return <Loading resourceName="your requests" />;
    }
    
    return (
      <Center>
        <h1>Your Requests</h1>
        <RequestList requests={requests} onTouchTapItem={this.handleTouchTapItem} />
  
        <FloatingActionButton style={{position: 'fixed', bottom: '2rem', right: '2rem'}}
                              secondary={true}
                              onTouchTap={() => browserHistory.push('/requests/create')}>
          <ContentAdd />
        </FloatingActionButton>
      </Center>
    )
  }
}

MyRequestsPage.propTypes = {
  requests: PropTypes.array.isRequired,
  loadUserRequests: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { myRequests } = state.mappings;
  let requests = myRequests && myRequests.map(requestId => state.entities.requests[requestId]);

  return {
    requests,
    loading: loadingHelper(state, requests, REQUESTS_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUserRequests
})(MyRequestsPage)