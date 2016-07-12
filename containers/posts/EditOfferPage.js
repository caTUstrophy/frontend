import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import { updateOffer, loadOffer, loadTags, loadRegions, UPDATE_OFFER_SUCCESS } from '../../actions'
import OfferForm from '../../forms/OfferForm'
import Center from '../layout/Center'
import {LocationPropType} from "../../helpers/Location";

function loadData(props) {
  const { loadOffer, ID } = props;
  loadOffer(ID);
}

class EditOfferPage extends Component {
  static propTypes = {
    ID: PropTypes.string.isRequired,
    offer: PropTypes.object,
    location: LocationPropType,
    
    loadTags: PropTypes.func.isRequired,
    loadOffer: PropTypes.func.isRequired,
    loadRegions: PropTypes.func.isRequired
  };

  componentWillMount() {
    loadData(this.props)
  }
  
  @autobind
  handleSubmit(offer) {
    let extendedOffer = Object.assign({}, this.props.offer, offer, { ValidityPeriod: offer.ValidityPeriod.toISOString()});
    
    this.props.updateOffer(extendedOffer)
      .then(result => {
        if (result.type == UPDATE_OFFER_SUCCESS) {
          browserHistory.push('/me/offers'); // todo: improve this
        }
      }).catch(e => {
      console.log("Catch", e);
    });
  }

  render() {
    const { offer, ID } = this.props;
    if (!offer) {
      return <h1><i>Loading offer #{ID}...</i></h1>
    }

    return (
      <Center vertical={true}>
        <OfferForm offer={this.props.offer}
                   onSubmit={this.handleSubmit}
                   defaultLocation={this.props.location}
                   regions={this.props.regions}
                   allowedTags={this.props.tags}  />
      </Center>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { ID } = ownProps.params;
  let offer = state.entities.offers[ID];
  if (offer) {
    offer = Object.assign({}, offer, {
      Tags: offer.Tags.map(({Name}) => Name),
      ValidityPeriod: new Date(offer.ValidityPeriod)
    });
  }

  return {
    ID,
    offer,
    location: state.location,
    regions: Object.values(state.entities.regions),
    tags: Object.values(state.entities.tags)
  }
}

export default connect(mapStateToProps, {
  loadOffer,
  loadTags,
  loadRegions,
  updateOffer
})(EditOfferPage)
