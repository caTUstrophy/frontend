import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Leaflet from 'leaflet';
import { Marker } from 'react-leaflet';

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

  static greenMarker = Leaflet.icon({
    iconUrl: '/images/maps/marker-icon-green.png',
    shadowUrl: '/images/maps/marker-shadow.png'
  });

  componentWillMount() {
    loadData(this.props)
  }

  render() {
    const notification = this.props.notification;
    const profile = this.props.profile;

    if (!notification || !profile) {
      return <h1>Loading notification...</h1>; // todo: loading animation
    }

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={notification.ID ? <span>Congratulations! You have a new <b>{notification.Type}</b>.</span> : "Your notification"} />
        <SimpleMap style={{height: '200px'}}
                   center={{ lat: (notification.matching.Offer.Location.lat + notification.matching.Request.Location.lat) / 2,
                   lng: (notification.matching.Offer.Location.lng + notification.matching.Request.Location.lng) / 2}}>
          <Marker position={notification.matching.Offer.Location}
                  icon={NotificationCard.greenMarker}
                  onClick={function () {}} />
          <Marker position={notification.matching.Request.Location}
                  onClick={function () {}} />
        </SimpleMap>
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
