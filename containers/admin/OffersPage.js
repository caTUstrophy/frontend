import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { loadOffers } from '../../actions/offers'
import OfferList from '../../components/OfferList'

class OffersPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadOffers();
  }

  @autobind
  handleTouchTapItem(offer) {
    browserHistory.push(`/admin/offers/${ offer.ID }`);
  }

  render() {
    const { offers } = this.props;
    if (!offers) {
      return <h1><i>Loading offers...</i></h1>
    }

    return (
      <div>
        <h1>Offers</h1>
        <OfferList offers={offers} onTouchTapItem={this.handleTouchTapItem} />
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
