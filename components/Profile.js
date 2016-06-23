import React, { Component, PropTypes } from 'react'

import MailIcon from 'material-ui/svg-icons/communication/mail-outline'
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
import VerifiedIcon from 'material-ui/svg-icons/action/verified-user'
import { Card, CardHeader, CardText } from 'material-ui/Card'

export default class Profile extends Component {
  render() {
    let profile = this.props.profile;

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={`${profile.Name}'s profile`} />
        <CardText>
          <h2>{profile.Name} {profile.PreferredName && profile.PreferredName.length ? `(${profile.PreferredName})` : ''}</h2>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
            <MailIcon style={{marginRight: '0.5rem'}} />
            {profile.Mail} &nbsp;
            <span style={{color: 'gray'}}>{profile.MailVerified ? <VerifiedIcon /> : <i>not verified</i>}</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
            <PhoneIcon style={{marginRight: '0.5rem'}} />
            {profile.Phone || <span style={{color: 'gray'}}>No phone number</span>} &nbsp;

          </div>
          <h3 style={{marginTop: '2rem'}}>Permissions</h3>
          <pre>{JSON.stringify(profile.Groups, null, 2)}</pre>
        </CardText>
      </Card>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    ID: PropTypes.string.isRequired,
    Mail: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    PreferredName: PropTypes.string.isRequired
  }).isRequired
};
