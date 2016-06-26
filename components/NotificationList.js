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
      notificationList = this.props.notifications.map(notification =>
        <ListItem key={notification.ID}
                  onTouchTap={this.props.onTouchTapItem.bind(this, notification)} />
      );
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
    ID: PropTypes.string.isRequired
  })).isRequired,
  onTouchTapItem: PropTypes.func.isRequired
};