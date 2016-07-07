import React, { Component, PropTypes } from 'react'
import { NotificationPropType } from '../schemas/NotificationSchema'

import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import HardwarePhoneIphone from 'material-ui/svg-icons/hardware/phone-iphone'
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import LabelIcon from 'material-ui/svg-icons/action/label'
import { toString } from "../helpers/Location"

export default class Notification extends Component {
  static propTypes = {
    notification: NotificationPropType.isRequired,
    profile: PropTypes.object.isRequired
  };

  render() {
    const user = this.props.profile;
    const userPost = user.ID === this.props.notification.matching.Request.User.ID ? this.props.notification.matching.Request : this.props.notification.matching.Offer;
    const userPostType = user.ID === this.props.notification.matching.Request.User.ID ? "request" : "offer";
    const matchedPost = user.ID === this.props.notification.matching.Request.User.ID ? this.props.notification.matching.Offer : this.props.notification.matching.Request;
    const matchedPostType = user.ID === this.props.notification.matching.Request.User.ID ? "offer" : "request";

    if (!matchedPost.User) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <h2>{userPost.Name}</h2>
        <p>Your {userPostType} for {userPost.Name} has been matched with another user's {matchedPostType}. Here are their contact details:</p>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <AccountIcon style={{marginRight: '0.5rem'}} /> {matchedPost.User ? matchedPost.User.Name : "Someone"}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <EmailIcon style={{marginRight: '0.5rem'}} /> {matchedPost.User ? matchedPost.User.Mail : "Email"}
        </div>
        {matchedPost.User.PhoneNumbers.map((phoneNumber, index) =>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}} key={index}>
            <PhoneIcon style={{marginRight: '0.5rem'}} /> {phoneNumber}
          </div>
        )}
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <LocationIcon style={{marginRight: '0.5rem'}} /> {toString(matchedPost.Location)}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <LabelIcon style={{marginRight: '0.5rem'}} /> <i>Untagged</i>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <TimerIcon style={{marginRight: '0.5rem'}} /> {new Date(matchedPost.ValidityPeriod).toString()}
        </div>
      </div>
    )
  }
}