import React, { Component, PropTypes } from 'react'

import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import LabelIcon from 'material-ui/svg-icons/action/label-outline'

import { RequestPropType } from '../schemas/RequestSchema'
import { toString } from "../helpers/Location"

export default class Request extends Component {
  static propTypes = {
    request: RequestPropType.isRequired
  };

  render() {
    const request = this.props.request;

    return (
      <div>
        <h2>{request.Name}</h2>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <AccountIcon style={{marginRight: '0.5rem'}} /> {request.User ? request.User.Name : "You"}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <LocationIcon style={{marginRight: '0.5rem'}} /> {toString(request.Location)}
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
          <LabelIcon style={{marginRight: '0.5rem'}} /> <i>Untagged</i>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <TimerIcon style={{marginRight: '0.5rem'}} /> {new Date(request.ValidityPeriod).toString()}
        </div>
      </div>
    )
  }
}