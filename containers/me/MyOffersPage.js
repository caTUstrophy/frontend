import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'
import { get as _get } from 'lodash';

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { loadUserOffers, OFFERS_REQUEST } from '../../actions/offers'
import OfferList from '../../components/OfferList'
import {OfferPropType} from "../../schemas/OfferSchema";

import loadingHelper from '../helpers/loadingHelper'

import Center from '../layout/Center'
import Loading from '../misc/Loading'

class MyOffersPage extends Component {
  static propTypes = {
    offers: PropTypes.arrayOf(OfferPropType),
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
    const { offers, loading } = this.props;

    if (loading) {
      return <Loading resourceName="your offers" />;
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
  const myOfferIds = _get(state.mappings, 'my.offers');
  const offers = myOfferIds && myOfferIds.map(offerId => state.entities.offers[offerId]);
  
  return {
    offers,
    loading : loadingHelper(state, offers, OFFERS_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUserOffers
})(MyOffersPage)