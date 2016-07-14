import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { loadRequest, REQUEST_REQUEST } from '../../actions'
import RequestCard from '../../components/posts/RequestCard'

import Center from '../layout/Center';
import Loading from '../misc/Loading';
import {RequestPropType} from "../../schemas/RequestSchema";

class RequestPage extends Component {
  static propTypes = {
    ID: PropTypes.string.isRequired,
    request: RequestPropType,
    loadRequest: PropTypes.func.isRequired
  };
  
  loadData() {
    this.props.loadRequest(this.props.ID, ['User']);
  }

  componentWillMount() {
    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ID !== this.props.ID) {
      this.loadData(nextProps)
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
