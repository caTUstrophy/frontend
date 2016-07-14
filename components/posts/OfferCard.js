import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import { OfferPropType } from '../../schemas/OfferSchema'
import SimpleMap from '../maps/SimpleMap';

import Offer from './Offer'

export default class OfferCard extends Component {
  static propTypes = {
    offer: OfferPropType.isRequired,
    editable: PropTypes.bool,
    navigateToEditOffer: PropTypes.func.isRequired
  };
  
  render() {
    const offer = this.props.offer;
    
    let cardActions;
    if (this.props.editable) {
      cardActions = <CardActions style={{display: 'flex', flexDirection: 'row-reverse'}}>
        <FlatButton label="Edit offer" onTouchTap={this.props.navigateToEditOffer.bind(this)} disabled={offer.Matched} />;
      </CardActions>;
    }
    
    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={offer.User ? <span><b>{offer.User.Name}</b> offers <b>{offer.Name}</b></span> : "You offer"} />
        <SimpleMap style={{height: '200px'}}
                   marker={offer.Location} />
        <CardText>
          <Offer offer={offer} />
        </CardText>
        {cardActions}
      </Card>
    )
  }
}