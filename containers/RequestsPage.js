import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadRequests } from '../actions/requests'
import RequestList from '../components/RequestList'

function loadData(props) {
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
            <RequestList requests={requests} />
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