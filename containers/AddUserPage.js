import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../actions'
import UserForm from '../forms/UserForm'

class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <UserForm onSubmit={(e) => console.dir(e)} />
      </div>
    )
  }
}

UserPage.propTypes = {
  ID: PropTypes.number.isRequired,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired
};

export default connect(undefined, {

})(UserPage)
