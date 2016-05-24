import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { Card, CardHeader, CardText } from 'material-ui/Card'

export default class User extends Component {
  render() {
    const user = this.props.user

    return (
      <Card>
        <CardHeader title={`${user.FirstName} ${user.LastName}`} />
        <CardText>
          {JSON.stringify(user)}
        </CardText>
      </Card>
    )
  }
}

User.propTypes = {
  user: PropTypes.shape({
    ID: PropTypes.number.isRequired
  }).isRequired
};
