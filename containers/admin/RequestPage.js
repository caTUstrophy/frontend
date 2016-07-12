import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { REQUEST_REQUEST, loadRequest } from '../../actions'
import RequestCard from '../../components/RequestCard'

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
    const { request, ID, loading } = this.props;
    if (loading) {
      return <h1><i>Loading request #{ID}...</i></h1>
    }

    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <RequestCard request={request} />
      </div>
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
  const loading = state.loading.loading;

  return {
    ID,
    request: requests[ID],
    loading: loading.includes(REQUEST_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadRequest
})(RequestPage)
