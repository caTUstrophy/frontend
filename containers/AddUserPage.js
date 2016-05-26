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
    user.ID = Math.round(Math.random() * 10000);
    user.PasswordHash = 'hash' + Math.random();
    user.PasswordSalt = 'salt' + Math.random();
    let userCreation = this.props.createUser(user);
    userCreation.then(e => {
      alert("Success.");
      console.dir(e);
    }).catch(e =>  {
      alert("Failure.");
      console.dir(e);
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
