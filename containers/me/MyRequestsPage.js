import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { loadUserRequests } from '../../actions/requests'
import RequestList from '../../components/RequestList'

import Center from '../layout/Center'

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
    const { requests } = this.props;
    if (!requests) {
      return <h1><i>Loading your requests...</i></h1>
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
  const { entities: { requests } } = state;
  const { myRequests } = state.mappings;

  return {
    requests: Object.values(requests).filter(function(item) {
      return myRequests.includes(item.ID)
    })
  }
}

export default connect(mapStateToProps, {
  loadUserRequests
})(MyRequestsPage)