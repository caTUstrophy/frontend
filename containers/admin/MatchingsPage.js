import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { MATCHINGS_MATCHING, loadMatchings } from '../../actions/matchings'
import MatchingList from '../../components/MatchingList'

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
            return <h1><i>Loading matches...</i></h1>
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
    const { entities: { matchings } } = state;
    const { loading } = state.loading;

    return {
        matchings: Object.values(matchings),
        loading: loading.includes(MATCHINGS_MATCHING)
    }
}

export default connect(mapStateToProps, {
    loadMatchings
})(MatchingsPage)
