import React, { Component, PropTypes } from 'react'

import { Card, CardHeader, CardText } from 'material-ui/Card'

export default class Profile extends Component {
  render() {
    let profile = this.props.profile;

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
        title={<h1>{profile.Name}'s details</h1>} />
        <CardText>
          <h2>Name:</h2>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
            {profile.Name}
          </div>
          <h2>Preferred name:</h2>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
            {profile.PreferredName}
          </div>
          <h2>Email address:</h2>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
            {profile.Mail}
          </div>
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
