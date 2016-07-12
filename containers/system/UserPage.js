import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import autobind from 'autobind-decorator'

import { USER_REQUEST, loadUser, updateUser } from '../../actions'
import Profile from '../../components/Profile'
import PermissionsForm from '../../forms/PermissionsForm'

function loadData(props) {
  const { ID } = props;
  props.loadUser(ID, [ 'name' ]);
}

class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ID !== this.props.ID) {
      loadData(nextProps)
    }
  }

  @autobind
  handleDeletePermission(permission) {
    let newUser = Object.assign({}, this.props.user);
    newUser.Groups = newUser.Groups.filter((group) => group.ID != permission.ID);

    this.props.updateUser(newUser); // todo: handle failures
  }

  render() {
    const { user, ID, loading } = this.props;
    if (loading) {
      return <h1><i>Loading {ID}’s profile...</i></h1>
    }

    let permissionsForm = this.props.user.Groups
      ? <PermissionsForm permissions={this.props.user.Groups} onDeletePermission={this.handleDeletePermission} />
      : <i>Loading...</i>;
    
    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <Profile profile={user} permissionsComponent={permissionsForm} />
      </div>
    )
  }
}

UserPage.propTypes = {
  ID: PropTypes.string.isRequired,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { ID } = ownProps.params;
  const users = state.entities.users;

  return {
    ID,
    user: users[ID],
    loading: state.loading.loading.includes(USER_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUser,
  updateUser
})(UserPage)
