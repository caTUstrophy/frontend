import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUsers } from '../actions'
import UserList from '../components/UserList'

function loadData(props) {
  props.loadUsers();
}

class UsersPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  render() {
    const { users } = this.props;
    if (!users) {
      return <h1><i>Loading users...</i></h1>
    }

    return (
      <UserList users={users} />
    )
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  loadUsers: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { users } } = state;

  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps, {
  loadUsers
})(UsersPage)
