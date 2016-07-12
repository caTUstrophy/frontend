import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

import { browserHistory } from 'react-router'

export default class MatchingList extends Component {
    render() {
        let matchingsList;
        if (this.props.matchings.length === 0) {
            matchingsList = <ListItem key="empty"
                                  primaryText="No matchings"
                                  disabled={true}/>
        } else {
            matchingsList = this.props.matchings.map(matching =>
              <ListItem key={matching.ID}
                        primaryText={`${matching.Offer.Name} and ${matching.Request.Name}`}
                        onTouchTap={this.props.onTouchTapItem.bind(this, matching)} />
            );
        }
        return (
          <List>
              {matchingsList}
          </List>
        )
    }
}

MatchingList.propTypes = {
    matchings: PropTypes.array.isRequired // todo: specify more detailed schema?
};
