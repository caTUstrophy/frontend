import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUserOffers } from '../../actions/offers'
import OfferList from '../../components/OfferList'

function loadData(props) {
  props.loadUserOffers();
}

class MyOffersPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  render() {
    const { offers } = this.props;
    if (!offers) {
      return <h1><i>Loading your offers...</i></h1>
    }

    return (
      <div>
        <h1>Your Offers</h1>
        <OfferList offers={offers} />
      </div>
    )
  }
}

MyOffersPage.propTypes = {
  offers: PropTypes.array.isRequired,
  loadUserOffers: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { offers } } = state;
  return {
    offers: Object.values(offers)
  }
}

export default connect(mapStateToProps, {
  loadUserOffers
})(MyOffersPage)