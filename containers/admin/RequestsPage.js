import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'
import { get as _get } from 'lodash';

import { REQUESTS_REQUEST, loadRequests } from '../../actions/requests'
import RequestList from '../../components/posts/RequestList'

import Loading from '../misc/Loading'
import {REGION_REQUEST} from "../../actions/regions";
import loadingHelper from "../helpers/loadingHelper";
import {loadRegion} from "../../actions/regions";
import {RegionPropType} from "../../schemas/RegionSchema";
import {RequestPropType} from "../../schemas/RequestSchema";

import Center from '../layout/Center'

class RequestsPage extends Component {
    static propTypes = {
        requests: PropTypes.arrayOf(RequestPropType),
        region: RegionPropType,
        loading: PropTypes.bool.isRequired,
        loadRequests: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.loadRegion(this.props.regionId);
        this.props.loadRequests(this.props.regionId);
    }
    
    @autobind
    handleTouchTapItem(request) {
        browserHistory.push(`/admin/requests/${ request.ID }`);
    }

    render() {
        const { requests, region, loading } = this.props;
        if (loading) {
            return <Loading resourceName="requests" />;
        }

        return (
          <Center>
            <h1>Requests in {region.Name}</h1>
            <RequestList requests={requests} onTouchTapItem={this.handleTouchTapItem} />
          </Center>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const requestIds = _get(state.mappings, `regions.${ ownProps.params.ID }.requests`);
    const requests = requestIds && requestIds.map(requestId => state.entities.requests[requestId]);
    const region = state.entities.regions[ownProps.params.ID];
    
    return {
        requests,
        regionId: ownProps.params.ID,
        region,
        loading: loadingHelper(state, [region, requests], [REGION_REQUEST, REQUESTS_REQUEST])
    }
}

export default connect(mapStateToProps, {
    loadRequests,
    loadRegion
})(RequestsPage)