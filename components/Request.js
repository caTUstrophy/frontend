import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import LabelIcon from 'material-ui/svg-icons/action/label'

export default class Request extends Component {
    render() {
        const request = this.props.request

        return (
          <Card>
            <CardHeader style={{backgroundColor: 'lightgray'}}
                        title={<span><b>{request.User.Name}</b> requests <b>{request.Name}</b></span>} />
            <CardText>
              <h2>{request.Name}</h2>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                <AccountIcon style={{marginRight: '0.5rem'}} /> {request.User.Name}
              </div>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                <LocationIcon style={{marginRight: '0.5rem'}} /> {request.Location}
              </div>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                <LabelIcon style={{marginRight: '0.5rem'}} /> <i>Untagged</i>
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <TimerIcon style={{marginRight: '0.5rem'}} /> {new Date(request.ValidityPeriod).toString()}
              </div>
            </CardText>
          </Card>
        )
    }
}

Request.propTypes = {
    request: PropTypes.shape({
        ID: PropTypes.string.isRequired
    }).isRequired
};