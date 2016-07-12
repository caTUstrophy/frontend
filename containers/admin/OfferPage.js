import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadOffer } from '../../actions'
import OfferCard from '../../components/OfferCard'
import Center from '../layout/Center'

function loadData(props) {
  const { loadOffer, ID } = props;
  loadOffer(ID);
}

class OfferPage extends Component {
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
    const { offer, ID } = this.props;
    if (!offer) {
      return <h1><i>Loading offer #{ID}...</i></h1>
    }

    return (
      <Center vertical={true}>
        <OfferCard offer={offer} />
      </Center>
    )
  }
}

OfferPage.propTypes = {
  ID: PropTypes.string.isRequired,
  offer: PropTypes.object,
  loadOffer: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { ID } = ownProps.params;
  const offers = state.entities.offers;

  return {
    ID,
    offer: offers[ID]
  }
}

export default connect(mapStateToProps, {
  loadOffer
})(OfferPage)
