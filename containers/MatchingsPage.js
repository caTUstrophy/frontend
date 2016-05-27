import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadMatchings } from '../actions/matchings'
import MatchingList from '../components/MatchingList'

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
        const { matchings } = this.props;
        if (!matchings) {
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

    return {
        matchings: Object.values(matchings)
    }
}

export default connect(mapStateToProps, {
    loadMatchings
})(MatchingsPage)
