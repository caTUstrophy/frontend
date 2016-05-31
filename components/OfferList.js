import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

import { browserHistory } from 'react-router'

export default class OfferList extends Component {
  navigateToOfferPage(id) {
    browserHistory.push(`/offer/${ id }`);
  }

  render() {
    let offerList;
    if (this.props.offers.length === 0) {
      offerList = <ListItem key="empty"
                              primaryText="No offers"
                              disabled={true}/>
    } else {
      offerList = this.props.offers.map(offer =>
        <ListItem key={offer.ID}
                  primaryText={`${offer.Title}`}
                  secondaryText={offer.Description}
                  onTouchTap={this.navigateToOfferPage.bind(this, offer.ID)} />
      );
    }
    return (
      <List>
        {offerList}
      </List>
    )
  }
}

OfferList.propTypes = {
  offers: PropTypes.array.isRequired // todo: specify more detailed schema?
};
