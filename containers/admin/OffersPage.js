import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'
import { get as _get } from 'lodash';

import { OFFERS_REQUEST, loadOffers, loadRegion, REGION_REQUEST } from '../../actions'
import OfferList from '../../components/OfferList'

import Loading from '../misc/Loading'
import Center from '../layout/Center'
import loadingHelper from "../helpers/loadingHelper";
import {RegionPropType} from "../../schemas/RegionSchema";
import {OfferPropType} from "../../schemas/OfferSchema";

class OffersPage extends Component {
  static propTypes = {
    offers: PropTypes.arrayOf(OfferPropType),
    region: RegionPropType,
    loading: PropTypes.bool.isRequired,
    loadOffers: PropTypes.func.isRequired
  };
  
  componentWillMount() {
    this.props.loadRegion(this.props.regionId);
    this.props.loadOffers(this.props.regionId);
  }

  @autobind
  handleTouchTapItem(offer) {
    browserHistory.push(`/admin/offers/${ offer.ID }`);
  }

  render() {
    const { region, offers, loading} = this.props;
    if (loading) {
      return <Loading resourceName="offers" />;
    }

    return (
      <Center>
        <h1>Offers in {region.Name}</h1>
        <OfferList offers={offers} onTouchTapItem={this.handleTouchTapItem} />
      </Center>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const offerIds = _get(state.mappings, `regions.${ ownProps.params.ID }.offers`);
  const offers = offerIds && offerIds.map(offerId => state.entities.offers[offerId]);
  const region = state.entities.regions[ownProps.params.ID];

  return {
    offers,
    regionId: ownProps.params.ID,
    region,
    loading: loadingHelper(state, [region, offers], [REGION_REQUEST, OFFERS_REQUEST])
  }
}

export default connect(mapStateToProps, {
  loadOffers,
  loadRegion
})(OffersPage)
