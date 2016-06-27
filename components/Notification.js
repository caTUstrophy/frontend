import React, { Component, PropTypes } from 'react'
import { NotificationPropType } from '../schemas/NotificationSchema'

export default class Notification extends Component {
  static propTypes = {
    notification: NotificationPropType.isRequired
  };

  render() {
    const notification = this.props.notification;

    return (
      <div>
        <h2>{notification.Type}</h2>
        <pre>{JSON.stringify(notification, null, 2)}</pre>
      </div>
    )
  }
}