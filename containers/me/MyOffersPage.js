import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

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
  
  @autobind
  handleTouchTapItem(offer) {
    browserHistory.push(`/me/offers/${ offer.ID }`)
  }

  render() {
    const { offers } = this.props;
    if (!offers) {
      return <h1><i>Loading your offers...</i></h1>
    }

    return (
      <div>
        <h1>Your Offers</h1>
        <OfferList offers={offers} onTouchTapItem={this.handleTouchTapItem} />
      </div>
    )
  }
}

MyOffersPage.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired
  })).isRequired,
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