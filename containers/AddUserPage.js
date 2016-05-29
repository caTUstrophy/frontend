import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions'
import UserForm from '../forms/UserForm'

import autobind from 'autobind-decorator'

class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  handleSubmit(user) {
    this.props.createUser(user)
      .then(e => {
        console.log("Then", e);
        // todo: on actual success transfer to a relevant page
      }).catch(e => {
        console.log("Catch", e);
      });
  }

  render() {
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <UserForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

UserPage.propTypes = {
  ID: PropTypes.number.isRequired,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired
};

export default connect(null, {
  createUser
})(UserPage)
