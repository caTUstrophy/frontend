import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { loadUserOffers, OFFERS_REQUEST } from '../../actions/offers'
import OfferList from '../../components/OfferList'
import {OfferPropType} from "../../schemas/OfferSchema";

import Center from '../layout/Center'

class MyOffersPage extends Component {
  static propTypes = {
    offers: PropTypes.arrayOf(OfferPropType).isRequired,
    loadUserOffers: PropTypes.func.isRequired
  };
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadUserOffers();
  }
  
  @autobind
  handleTouchTapItem(offer) {
    browserHistory.push(`/me/offers/${ offer.ID }`)
  }

  render() {
    const { offers } = this.props;
    const { loading } = this.props;

    if (loading) {
      return <h1><i>Loading your offers...</i></h1>
    }

    return (
      <Center>
        <h1>Your Offers</h1>
        <OfferList offers={offers} onTouchTapItem={this.handleTouchTapItem} />
  
        <FloatingActionButton style={{position: 'fixed', bottom: '2rem', right: '2rem'}}
                              secondary={true}
                              onTouchTap={() => browserHistory.push('/offers/create')}>
          <ContentAdd />
        </FloatingActionButton>
      </Center>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { entities: { offers }, loading } = state;
  const { myOffers } = state.mappings;
  
  return {
    offers: myOffers && myOffers.map(offerId => offers[offerId]),
    loading : loading.includes(OFFERS_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUserOffers
})(MyOffersPage)