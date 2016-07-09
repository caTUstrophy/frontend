import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadMatching } from '../../actions'
import MatchingCard from '../../components/MatchingCard'

function loadData(props) {
  const { loadMatching, ID } = props;
  loadMatching(ID);
}

class MatchingPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ID !== this.props.ID) {
      loadData(nextProps)
    }
  }

  render() {
    const { matching, ID } = this.props;
    if (!matching) {
      return <h1><i>Loading matching #{ID}...</i></h1>
    }

    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <MatchingCard matching={matching} />
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
  const matchings = state.entities.matchings;

  return {
    ID,
    matching: matchings[ID]
  }
}

export default connect(mapStateToProps, {
  loadMatching
})(MatchingPage)
