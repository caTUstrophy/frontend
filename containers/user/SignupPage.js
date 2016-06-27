import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { createUser, CREATE_USER_SUCCESS } from '../../actions'
import Main from '../Main'
import UserForm from '../../forms/UserForm'

import autobind from 'autobind-decorator'
import {UserFields} from "../../schemas/UserSchema";
import cleanBeforeSubmit from "../../schemas/helpers/cleanBeforeSubmit";

const cleanUserBeforeSubmit = cleanBeforeSubmit(UserFields)

class SignupPage extends Component {
  static propTypes = {
    // injected by react-redux
    createUser: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  @autobind
  handleSubmit(user) {
    this.props.createUser(cleanUserBeforeSubmit(user))
      .then(result => {
        if (result.type == CREATE_USER_SUCCESS) {
          browserHistory.goBack()
        }
      })
  }

  render() {
    return (
      <Main>
        <div style={{display: 'flex', height: '100%'}}>
          <div style={{width: '40rem', margin: 'auto'}}>
            <UserForm onSubmit={this.handleSubmit} />
          </div>
        </div>
      </Main>
    )
  }
}

export default connect(null, {
  createUser
})(SignupPage)
