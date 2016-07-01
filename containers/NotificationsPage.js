import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { loadNotifications } from '.././actions/notifications'
import { loadMatching } from '.././actions/matchings'
import NotificationList from '.././components/NotificationList'

class NotificationsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.notifications.forEach((newNotification) => {
      // todo: make use of normalized data here
      if (!this.props.notifications.some(oldNotification => oldNotification.ID == newNotification.ID)) {
        switch (newNotification.Type) {
          case 'matching':
            this.props.loadMatching(newNotification.ItemID);
            break;
          default:
            console.warn(`Unsupported notification type: ${newNotification.Type}`);
        }
      }
    });
  }

  @autobind
  handleTouchTapItem(notification) {
    browserHistory.push(`/notifications/${ notification.ID }`)
  }

  render() {
    const { notifications } = this.props;
    if (!notifications) {
      return <h1><i>Loading your notifications...</i></h1>
    }

    return (
      <div>
        <h1>Your Notifications</h1>
        <NotificationList notifications={notifications} onTouchTapItem={this.handleTouchTapItem} />
      </div>
    )
  }
}

NotificationsPage.propTypes = {
  ID: PropTypes.string.isRequired,
  notifications: PropTypes.array.isRequired,
  loadNotifications: PropTypes.func.isRequired,
  matching: PropTypes.array.isRequired,
  loadMatching: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { notifications, matchings } } = state;

  return {
    notifications: Object.values(notifications).map(notification => {
        switch (notification.Type) {
          case 'matching':
            notification.matching = matchings[notification.ItemID];
            break;
          default:
            console.warn(`Unsupported notification type: ${notification.Type}`);
        }
      return notification;
    })
  }
}

export default connect(mapStateToProps, {
  loadNotifications,
  loadMatching
})(NotificationsPage)