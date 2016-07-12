import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { MATCHINGS_REQUEST, loadUserMatchings } from '../../actions/matchings'
import MatchingList from '../../components/MatchingList'
import extractMatching from './../helpers/extractMatching'

import Center from '../layout/Center'

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
      <Center>
        <h1>Your Matchings</h1>
        <MatchingList matchings={matchings} onTouchTapItem={this.handleTouchTapItem} />
      </Center>
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
  const { myMatchings } = state.mappings;

  return {
    matchings: myMatchings && myMatchings.map(
      matchingId => extractMatching(state, matchingId)
    ),
    loading: state.loading.includes(MATCHINGS_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUserMatchings
})(MyMatchingsPage)