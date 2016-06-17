import React, { Component, PropTypes } from 'react'

import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import LabelIcon from 'material-ui/svg-icons/action/label'

import { OfferPropType } from '../schemas/OfferSchema'
import { toString } from "../helpers/Location"

export default class Offer extends Component {
  static propTypes = {
    offer: OfferPropType.isRequired
  };
  
  render() {
    const offer = this.props.offer;
    
    return (
      <div>
        <h2>{offer.Name}</h2>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <AccountIcon style={{marginRight: '0.5rem'}} /> {offer.User ? offer.User.Name : "You"}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <LocationIcon style={{marginRight: '0.5rem'}} /> {toString(offer.Location)}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <LabelIcon style={{marginRight: '0.5rem'}} /> <i>Untagged</i>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <TimerIcon style={{marginRight: '0.5rem'}} /> {new Date(offer.ValidityPeriod).toString()}
        </div>
      </div>
    )
  }
}