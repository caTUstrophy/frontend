import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

import { browserHistory } from 'react-router'

export default class OfferList extends Component {
  navigateToOfferPage(id) {
    browserHistory.push(`/offer/${ id }`);
  }

  render() {
    return (
      <List>
        {this.props.offers.map(offer =>
          <ListItem key={offer.ID}
                    primaryText={`${offer.Title}`}
                    secondaryText={offer.Description}
                    onTouchTap={this.navigateToOfferPage.bind(this, offer.ID)} />
        )}
      </List>
    )
  }
}

OfferList.propTypes = {
  offers: PropTypes.array.isRequired // todo: specify more detailed schema?
};
