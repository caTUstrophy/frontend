import React, { Component, PropTypes } from 'react'

import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import LabelIcon from 'material-ui/svg-icons/action/label'

import { NotificationPropType } from '../schemas/NotificationSchema'
import { toString } from "../helpers/Location"

export default class Offer extends Component {
  static propTypes = {
    notification: NotificationPropType.isRequired
  };

  render() {
    const notification = this.props.notification;

    return (
      <div>
        <h2>{notification.ID}</h2>
      </div>
    )
  }
}