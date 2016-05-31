import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createOffer } from '../actions/offers'
import OfferForm from '../forms/OfferForm'
import {browserHistory} from 'react-router'
import {createOffer, CREATE_OFFERS_SUCCESS} from '../actions/offers'
import autobind from 'autobind-decorator'

class OfferPage extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  handleSubmit(offer) {
    offer.ValidityPeriod = offer.ValidityPeriod.getTime();
    this.props.createOffer(offer)
      .then(e => {
        if (e.type == CREATE_OFFERS_SUCCESS) {
          browserHistory.push('/admin/offers'); // todo: improve this
        }
      }).catch(e => {
      console.log("Catch", e);
    });
  }

  render() {
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <OfferForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

OfferPage.propTypes = {
  ID: PropTypes.number.isRequired,
  offer: PropTypes.object,
  loadOffer: PropTypes.func.isRequired
};

export default connect(null, {
  createOffer
})(OfferPage)
