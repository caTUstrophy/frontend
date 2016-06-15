import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { createUser, CREATE_USER_SUCCESS } from '../../actions'
import UserForm from '../../forms/UserForm'

import autobind from 'autobind-decorator'

class SignupPage extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  handleSubmit(user) {
    this.props.createUser(user)
      .then(result => {
        if (result.type == CREATE_USER_SUCCESS) {
          browserHistory.goBack()
        }
      })
  }

  render() {
    return (
      <div style={{display: 'flex', height: '100%'}}>
        <div style={{width: '40rem', margin: 'auto'}}>
          <UserForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    )
  }
}

SignupPage.propTypes = {
  ID: PropTypes.string.isRequired,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired
};

export default connect(null, {
  createUser
})(SignupPage)
