import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { Card, CardHeader, CardText } from 'material-ui/Card'

export default class User extends Component {
  render() {
    const user = this.props.user

    return (
      <Card>
        <CardHeader style={{backgroundColor: 'lightgray'}}
                    title={`${user.FirstName} ${user.LastName}`} />
        <CardText>
          <pre>{JSON.stringify(user, null, 2)}</pre>
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
