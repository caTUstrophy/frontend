import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadRequests } from '../../actions/requests'
import RequestList from '../../components/RequestList'

function loadData() {
    props.loadRequests();
}

class RequestsPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        loadData(this.props)
    }

    render() {
        const { requests } = this.props;
        if (!requests) {
            return <h1><i>Loading requests...</i></h1>
        }

        return (
          <div>
            <h1>Requests</h1>
            <RequestList requests={requests} />
          </div>
        )
    }
}

RequestsPage.propTypes = {
    requests: PropTypes.array.isRequired,
    loadRequests: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const { entities: { requests } } = state;

    return {
        requests: Object.values(requests)
    }
}

export default connect(mapStateToProps, {
    loadRequests
})(RequestsPage)