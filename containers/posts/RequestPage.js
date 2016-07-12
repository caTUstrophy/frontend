import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadRequest } from '../../actions'
import RequestCard from '../../components/RequestCard'
import Center from '../layout/Center'

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

  render() {
    const { request, ID } = this.props;
    if (!request) {
      return <h1><i>Loading request #{ID}...</i></h1>
    }

    return (
      <Center vertical={true}>
        <RequestCard request={request} />
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
  const requests = state.entities.requests;

  return {
    ID,
    request: requests[ID]
  }
}

export default connect(mapStateToProps, {
  loadRequest
})(RequestPage)
