import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { USERS_REQUEST, loadUsers } from '../../actions'
import UserList from '../../components/UserList'

import Center from '../layout/Center';
import Loading from '../misc/Loading';

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

  @autobind
  handleTouchTapItem(user) {
    browserHistory.push(`/system/users/${ user.ID }`);
  }

  render() {
    const { users, loading } = this.props;
    if (loading) {
      return <Loading resourceName="users" />;
    }

    return (
      <Center>
        <h1>Users</h1>
        <UserList users={users} onTouchTapItem={this.handleTouchTapItem} />
      </Center>
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
    users: Object.values(users),
    loading: state.loading.includes(USERS_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUsers
})(UsersPage)
