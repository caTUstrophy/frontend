import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'
import { get as _get } from 'lodash';

import { MATCHINGS_REQUEST, loadUserMatchings } from '../../actions/matchings'
import MatchingList from '../../components/MatchingList'
import extractMatching from './../helpers/extractMatching'

import loadingHelper from '../helpers/loadingHelper'

import Center from '../layout/Center';
import Loading from '../misc/Loading';
import {MatchingPropType} from "../../schemas/MatchingSchema";

function loadData(props) {
  props.loadUserMatchings();
}

class MyMatchingsPage extends Component {
  static propTypes = {
    matchings: PropTypes.arrayOf(MatchingPropType),
    loading: PropTypes.bool.isRequired,
    loadUserMatchings: PropTypes.func.isRequired
  };

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
      return <Loading resourceName="your matches" />;
    }

    return (
      <Center>
        <h1>Your Matchings</h1>
        <MatchingList matchings={matchings} onTouchTapItem={this.handleTouchTapItem} />
      </Center>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const myMatchingIds = _get(state.mappings, 'my.matchings');
  const matchings = myMatchingIds && myMatchingIds.map(matchingId => extractMatching(state, matchingId));
  
  return {
    matchings,
    loading : loadingHelper(state, matchings, MATCHINGS_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUserMatchings
})(MyMatchingsPage)