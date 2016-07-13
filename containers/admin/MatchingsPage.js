import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { MATCHINGS_REQUEST, loadMatchings } from '../../actions/matchings'
import MatchingList from '../../components/MatchingList'

import Loading from '../misc/Loading'

function loadData(props) {
    props.loadMatchings();
}

class MatchingsPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        loadData(this.props)
    }

    render() {
        const { matchings, loading } = this.props;
        if (loading) {
            return <Loading resourceName="matches" />;
        }

        return (
            <MatchingList matchings={matchings} />
        )
    }
}

MatchingsPage.propTypes = {
    matchings: PropTypes.array.isRequired,
    loadMatchings: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {

    return {
        matchings: Object.values(state.entities.matchings),
        loading: state.loading.includes(MATCHINGS_REQUEST)
    }
}

export default connect(mapStateToProps, {
    loadMatchings
})(MatchingsPage)
