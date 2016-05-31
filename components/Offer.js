import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import LabelIcon from 'material-ui/svg-icons/action/label'


export default class Offer extends Component {
    render() {
        const offer = this.props.offer;

        return (
            <Card>
                <CardHeader style={{backgroundColor: 'lightgray'}}
                            title={<span><b>{offer.User.Name}</b> offers <b>{offer.Name}</b></span>} />
                <CardText>
                  <h2>{offer.Name}</h2>
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <AccountIcon style={{marginRight: '0.5rem'}} /> {offer.User.Name}
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <LocationIcon style={{marginRight: '0.5rem'}} /> {offer.Location}
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <LabelIcon style={{marginRight: '0.5rem'}} /> <i>Untagged</i>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <TimerIcon style={{marginRight: '0.5rem'}} /> {new Date(offer.ValidityPeriod).toString()}
                  </div>
                </CardText>
            </Card>
        )
    }
}

Offer.propTypes = {
    offer: PropTypes.shape({
        ID: PropTypes.number.isRequired
    }).isRequired
};