import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/login'
import LoginForm from '../../forms/LoginForm'
import Center from '../layout/Center'

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
      <Center>
        <LoginForm onSubmit={this.handleSubmit} />
      </Center>
    )
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, {
  login
})(LoginPage)
