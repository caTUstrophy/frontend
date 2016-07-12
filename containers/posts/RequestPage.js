import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { loadRequest, REQUEST_REQUEST } from '../../actions'
import RequestCard from '../../components/RequestCard'

import Center from '../layout/Center';
import Loading from '../misc/Loading';

function loadData(props) {
  const { loadRequest, ID } = props;
  loadRequest(ID);
}

class RequestPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ID !== this.props.ID) {
      loadData(nextProps)
    }
  }
  
  @autobind
  handleNavigateToEditRequest() {
    browserHistory.push(`/me/requests/${ this.props.ID }/edit`);
  }

  render() {
    const { request, isOwnRequest, loading } = this.props;
    if (loading) {
      return <Loading resourceName="request" />;
    }

    return (
      <Center vertical={true}>
        <RequestCard request={request} editable={isOwnRequest} navigateToEditRequest={this.handleNavigateToEditRequest} />
      </Center>
    )
  }
}

RequestPage.propTypes = {
  ID: PropTypes.string.isRequired,
  request: PropTypes.object,
  loadRequest: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { ID } = ownProps.params;
  const request = state.entities.requests[ID];
  const loading = state.loading;

  return {
    ID,
    isOwnRequest: request && request.User && request.User.Mail == state.login.token.iss,
    request,
    loading: loading.includes(REQUEST_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadRequest
})(RequestPage)
