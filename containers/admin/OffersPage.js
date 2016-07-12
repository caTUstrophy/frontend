import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { OFFERS_REQUEST, loadOffers } from '../../actions/offers'
import OfferList from '../../components/OfferList'

class OffersPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadOffers(this.props.regionId);
  }

  @autobind
  handleTouchTapItem(offer) {
    browserHistory.push(`/admin/offers/${ offer.ID }`);
  }

  render() {
    const { offers , loading} = this.props;
    if (loading) {
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
  const loading = state.loading.loading;

  return {
    offers: Object.values(offers),
    regionId: ownProps.params.ID,
    loading: loading.includes(OFFERS_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadOffers
})(OffersPage)
