import React, { Component, PropTypes } from 'react'

import MailIcon from 'material-ui/svg-icons/communication/mail-outline'
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
import VerifiedIcon from 'material-ui/svg-icons/action/verified-user'
import { Card, CardHeader, CardText } from 'material-ui/Card'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class Profile extends Component {
  renderPhoneNumbers(numbers) {
    if (numbers.length === 0) {
      return <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'gray'}}>
        <PhoneIcon style={{marginRight: '0.5rem'}} />
        No phone number
      </div>;
    }

    return numbers.map((number, index) =>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}
           key={index}>
        <PhoneIcon style={{marginRight: '0.5rem'}} />
        {number}
      </div>
    )
  }

  renderPermissions(groups) {
    return <div>
      <h3 style={{marginTop: '2rem'}}>Permissions</h3>
      {groups.map((group, index) => {
        let region;
        if (group.Region.Name) {
          region = `in region "${group.Region.Name}"`; // todo: link to region?
        } else {
          region = <i>globally</i>;
        }

        return <div key={index}>
          <b>{capitalizeFirstLetter(group.Permissions.map(permission => permission.AccessRight).join(', '))}</b> &nbsp;
          {region}
        </div>
      })}
    </div>
  }

  render() {
    let profile = this.props.profile;

    return (
      <Card>
        <CardText>
          <h2>{profile.Name} {profile.PreferredName && profile.PreferredName.length ? `(${profile.PreferredName})` : ''}</h2>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
            <MailIcon style={{marginRight: '0.5rem'}} />
            {profile.Mail} &nbsp;
            <span style={{color: 'gray'}}>{profile.MailVerified ? <VerifiedIcon /> : <i>not verified</i>}</span>
          </div>
          {this.renderPhoneNumbers(profile.PhoneNumbers)}

          {this.renderPermissions(profile.Groups)}
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
