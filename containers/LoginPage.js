import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/login'
import LoginForm from '../forms/LoginForm'

import autobind from 'autobind-decorator'

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  handleSubmit(loginData) {
    this.props.login(loginData);
  }

  render() {
    return (
      <div style={{display: 'flex', height: '100%'}}>
        <div style={{width: '40rem', margin: 'auto'}}>
          <LoginForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, {
  login
})(LoginPage)
