import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { REQUESTS_REQUEST, loadRequests } from '../../actions/requests'
import RequestList from '../../components/RequestList'

import Loading from '../misc/Loading'
import Center from './../layout/Center'

class RequestsPage extends Component {
    static propTypes = {
        regionId: PropTypes.string.isRequired,
        requests: PropTypes.array.isRequired,
        loadRequests: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadRequests(this.props.regionId);
    }
    
    @autobind
    handleTouchTapItem(request) {
        browserHistory.push(`/admin/requests/${ request.ID }`);
    }

    render() {
        const { requests, loading } = this.props;
        if (loading) {
            return <Loading resourceName="requests" />;
        }

        return (
          <Center>
            <h1>Requests</h1>
            <RequestList requests={requests} onTouchTapItem={this.handleTouchTapItem} />
          </Center>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { entities: { requests } } = state;
    const loading = state.loading;

    return {
        requests: Object.values(requests),
        regionId: ownProps.params.ID,
        loading: loading.includes(REQUESTS_REQUEST)
    }
}

export default connect(mapStateToProps, {
    loadRequests
})(RequestsPage)