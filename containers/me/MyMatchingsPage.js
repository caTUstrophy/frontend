import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { MATCHINGS_MATCHING, loadUserMatchings } from '../../actions/matchings'
import MatchingList from '../../components/MatchingList'
import extractMatching from './../helpers/extractMatching'

function loadData(props) {
  props.loadUserMatchings();
}

class MyMatchingsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  @autobind
  handleTouchTapItem(matching) {
    browserHistory.push(`/me/matchings/${ matching.ID }`)
  }

  render() {
    const { matchings, loading } = this.props;
    if (loading) {
      return <h1><i>Loading your matchings...</i></h1>
    }

    return (
      <div>
        <h1>Your Matchings</h1>
        <MatchingList matchings={matchings} onTouchTapItem={this.handleTouchTapItem} />
      </div>
    )
  }
}

MyMatchingsPage.propTypes = {
  matchings: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.string.isRequired
  })).isRequired,
  loadUserMatchings: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { matchings } } = state;
  const { myMatchings } = state.mappings;

  return {
    matchings: Object.keys(matchings).filter(function(matchingID){
      return myMatchings.includes(matchingID)
    }).map(
      matchingId => extractMatching(state, matchingId)
    ),
    loading: state.loading.loading.includes(MATCHINGS_MATCHING)
  }
}

export default connect(mapStateToProps, {
  loadUserMatchings
})(MyMatchingsPage)