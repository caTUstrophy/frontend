import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadOffers } from '../../actions/offers'
import OfferList from '../../components/OfferList'

function loadData(props) {
  props.loadOffers();
}

class OffersPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  render() {
    const { offers } = this.props;
    if (!offers) {
      return <h1><i>Loading offers...</i></h1>
    }

    return (
      <div>
        <h1>Offers</h1>
        <OfferList offers={offers} />
      </div>
    )
  }
}

OffersPage.propTypes = {
  offers: PropTypes.array.isRequired,
  loadOffers: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { offers } } = state;
  console.dir(state.entities);

  return {
    offers: Object.values(offers)
  }
}

export default connect(mapStateToProps, {
  loadOffers
})(OffersPage)
