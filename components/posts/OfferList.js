import React, { Component, PropTypes } from 'react'

import BasePostList from './BasePostList'
import { OfferPropType } from '../../schemas/OfferSchema'

export default class OfferList extends Component {
  static propTypes = {
    offers: PropTypes.arrayOf(OfferPropType).isRequired,
    onTouchTapItem: PropTypes.func.isRequired
  };
  
  render() {
    return <BasePostList posts={this.props.offers} postTypeName={"offer"} onTouchTapItem={this.props.onTouchTapItem} />;
  }
}
