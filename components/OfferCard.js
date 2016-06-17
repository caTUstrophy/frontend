import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { OfferPropType } from '../schemas/OfferSchema'
import SimpleMap from '../components/maps/SimpleMap';

import Offer from './Offer'

export default class OfferCard extends Component {
  static propTypes = {
    offer: OfferPropType.isRequired
  };
  
  render() {
    const offer = this.props.offer;
    
    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={offer.User ? <span><b>{offer.User.Name}</b> offers <b>{offer.Name}</b></span> : "You offer"} />
        <SimpleMap style={{height: '200px'}}
                   marker={offer.Location} />
        <CardText>
          <Offer offer={offer} />
        </CardText>
      </Card>
    )
  }
}