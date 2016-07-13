import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'
import { get as _get } from 'lodash';

import { MATCHINGS_REQUEST, loadRegionMatchings, REGION_REQUEST, loadRegion } from '../../actions'
import MatchingList from '../../components/MatchingList'

import extractMatching from "../helpers/extractMatching";
import loadingHelper from "../helpers/loadingHelper";

import Loading from '../misc/Loading'
import Center from './../layout/Center'

class MatchingsPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadRegionMatchings(this.props.regionId);
        this.props.loadRegion(this.props.regionId);
    }

    @autobind
    handleTouchTapItem(matching) {
        browserHistory.push(`/admin/matchings/${ matching.ID }`);
    }

    render() {
        const { matchings, region, loading } = this.props;

        if (loading) {
            return <Loading resourceName="matches" />;
        }

        return (
          <Center>
              <h1>Matches in {region.Name}</h1>
              <MatchingList matchings={matchings} onTouchTapItem={this.handleTouchTapItem} />
          </Center>
        )
    }
}

MatchingsPage.propTypes = {
    matchings: PropTypes.array.isRequired,
    loadRegionMatchings: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const matchingIds = _get(state.mappings, `regions.${ ownProps.params.ID }.matchings`);
    const matchings = matchingIds && matchingIds.map(matchingId => extractMatching(state, matchingId));
    const region = state.entities.regions[ownProps.params.ID];
    
    return {
        matchings,
        regionId: ownProps.params.ID,
        region,
        loading: loadingHelper(state, [region, matchings], [REGION_REQUEST, MATCHINGS_REQUEST])
    }
}

export default connect(mapStateToProps, {
    loadRegionMatchings,
    loadRegion
})(MatchingsPage)
