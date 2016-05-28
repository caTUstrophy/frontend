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
    console.dir(loginData);
    this.props.login(loginData)
      .then(e => {
        alert("Success.");
        console.dir(e);
      }).catch(e =>  {
        alert("Failure.");
        console.dir(e);
      });
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
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
