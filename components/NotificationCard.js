import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { NotificationPropType } from '../schemas/NotificationSchema'
import SimpleMap from '../components/maps/SimpleMap';

import Notification from './Notification'

export default class NotificationCard extends Component {
  static propTypes = {
    notification: NotificationPropType.isRequired
  };

  render() {
    const notification = this.props.notification;

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={notification.User ? <span><b>{notification.User.Name}</b> notifications <b>{notification.Name}</b></span> : "You notification"} />
        <SimpleMap style={{height: '200px'}}
                   marker={notification.Location} />
        <CardText>
          <Notification notification={notification} />
        </CardText>
      </Card>
    )
  }
}