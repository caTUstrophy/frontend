import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadMatching } from '../../actions'
import MatchingCard from '../../components/MatchingCard'
import extractMatching from './../helpers/extractMatching'

class MatchingPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.matching) {
      this.props.loadMatching();
    }
  }

  render() {
    const { matching, ID } = this.props;

    if (!matching) {
      return <h1><i>Loading matching #{ID}...</i></h1>
    }

    const offer = this.props.matching.Offer;
    const request = this.props.matching.Request;
    
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <MatchingCard matching={matching} offer={offer} request={request} />
      </div>
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
  const { entities: { matchings } } = state;

  return {
    ID,
    matching: extractMatching(state, ID)
  }
}

export default connect(mapStateToProps, {
  loadMatching
})(MatchingPage)
