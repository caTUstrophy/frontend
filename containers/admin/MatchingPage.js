import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { MATCHING_REQUEST, loadMatching } from '../../actions'
import MatchingCard from '../../components/MatchingCard'
import extractMatching from './../helpers/extractMatching'

import Loading from '../misc/Loading'
import Center from '../layout/Center'
import loadingHelper from "../helpers/loadingHelper";

class MatchingPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.matching) {
      this.props.loadMatching(this.props.ID);
    }
  }

  render() {
    const { matching, loading } = this.props;

    if (loading) {
      return <Loading resourceName="matching" />;
    }

    const offer = this.props.matching.Offer;
    const request = this.props.matching.Request;
    
    return (
      <Center>
        <MatchingCard matching={matching} offer={offer} request={request} />
      </Center>
    )
  }
}

MatchingPage.propTypes = {
  ID: PropTypes.string.isRequired,
  matching: PropTypes.object,
  loadMatching: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { ID } = ownProps.params;
  const matching = extractMatching(state, ID);
  
  return {
    ID,
    matching,
    loading: loadingHelper(state, matching, MATCHING_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadMatching
})(MatchingPage)
