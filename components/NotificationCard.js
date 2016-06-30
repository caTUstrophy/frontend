import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { NotificationPropType } from '../schemas/NotificationSchema'
import SimpleMap from '../components/maps/SimpleMap';

import Notification from './Notification'

import { loadUserProfile } from './../actions/profile'

function loadData(props) {
  props.loadUserProfile();
}

export default class NotificationCard extends Component {
  static propTypes = {
    notification: NotificationPropType.isRequired,
    loadUserProfile: PropTypes.func.isRequired
  };

  componentWillMount() {
    loadData(this.props)
  }

  render() {
    const notification = this.props.notification;
    const profile = this.props.profile;

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={notification.ID ? <span>Congratulations! You have a new <b>{notification.Type}</b>.</span> : "Your notification"} />
        <SimpleMap style={{height: '200px'}}
                   marker={notification.Matching.Offer.Location} />
        <CardText>
          <Notification notification={notification} profile={profile} />
        </CardText>
      </Card>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, {
  loadUserProfile
})(NotificationCard)
