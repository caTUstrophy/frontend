import React, { Component, PropTypes } from 'react'

import BasePost from './BasePost'
import { OfferPropType } from '../schemas/OfferSchema'

export default class Offer extends Component {
  static propTypes = {
    offer: OfferPropType.isRequired
  };
  
  render() {
    return <BasePost post={this.props.offer} />;
  }
}