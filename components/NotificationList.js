import React, { Component, PropTypes } from 'react'

import { List, ListItem } from 'material-ui/List'

export default class NotificationList extends Component {
  render() {
    let notificationList;
    if (this.props.notifications.length === 0) {
      notificationList = <ListItem key="empty"
                            primaryText="No notifications"
                            disabled={true}/>
    } else {
      notificationList = this.props.notifications.map(notification => {
        if (notification[notification.Type]) {
          return <ListItem key={notification.ID}
                           onTouchTap={this.props.onTouchTapItem.bind(this, notification)}
                           primaryText={`${notification.Type}: ${notification.matching.OfferId} and ${notification.matching.RequestId}`} />
        }
        return <ListItem key={notification.ID}
                  onTouchTap={this.props.onTouchTapItem.bind(this, notification)}
                  primaryText={`Loading ${notification.Type}...`} />
      });
    }
    return (
      <List>
        {notificationList}
      </List>
    )
  }
}

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.string.isRequired,
    ItemID: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired
  })).isRequired,
  onTouchTapItem: PropTypes.func.isRequired
};