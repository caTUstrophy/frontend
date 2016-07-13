import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import autobind from 'autobind-decorator'

import { MATCHINGS_REQUEST, loadRegionMatchings } from '../../actions/matchings'
import MatchingList from '../../components/MatchingList'

import Loading from '../misc/Loading'
import Center from './../layout/Center'

class MatchingsPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadRegionMatchings(this.props.regionId);
    }

    @autobind
    handleTouchTapItem(matching) {
        browserHistory.push(`/admin/matchings/${ matching.ID }`);
    }

    render() {
        const { matchings, loading } = this.props;

        if (loading) {
            return <Loading resourceName="matches" />;
        }

        return (
          <Center>
              <h1>Region matches</h1>
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
    return {
        regionId: ownProps.params.ID,
        matchings: Object.values(state.entities.matchings),
        loading: state.loading.includes(MATCHINGS_REQUEST)
    }
}

export default connect(mapStateToProps, {
    loadRegionMatchings
})(MatchingsPage)
