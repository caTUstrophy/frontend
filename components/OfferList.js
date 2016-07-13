import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'
import Chip from 'material-ui/Chip'

export default class OfferList extends Component {
  render() {
    let offerList;
    if (this.props.offers.length === 0) {
      offerList = <ListItem key="empty"
                              primaryText="No offers"
                              disabled={true}/>
    } else {
      offerList = this.props.offers.map(offer => {
        let description = <div style={{display: 'flex'}}>
          <div style={{marginRight: 'auto'}}>{offer.Name}</div>
          {offer.Tags.map(({Name}) => <Chip key={Name} style={{margin: '0 2px'}}>{Name}</Chip>)}
        </div>;
  
        return <ListItem key={offer.ID}
                         primaryText={description}
                         secondaryText={offer.Description}
                         onTouchTap={this.props.onTouchTapItem.bind(this, offer)}/>
      });
    }
    return (
      <List>
        {offerList}
      </List>
    )
  }
}

OfferList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired
  })).isRequired,
  onTouchTapItem: PropTypes.func.isRequired
};
