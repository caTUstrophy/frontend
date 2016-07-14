import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import autobind from 'autobind-decorator'

import { USER_REQUEST, loadUser, updateUser } from '../../actions'
import Profile from '../../components/Profile'
import PermissionsForm from '../../forms/PermissionsForm'

import Center from '../layout/Center';
import Loading from '../misc/Loading';
import loadingHelper from "../helpers/loadingHelper";

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
    const { user, loading } = this.props;
    if (loading) {
      return <Loading resourceName="user profile" />;
    }

    let permissionsForm = this.props.user.Groups
      ? <PermissionsForm permissions={this.props.user.Groups} onDeletePermission={this.handleDeletePermission} />
      : <i>Loading...</i>;
    
    return (
      <Center>
        <Profile profile={user} permissionsComponent={permissionsForm} />
      </Center>
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
  const user = state.entities.users[ID];

  return {
    ID,
    user,
    loading: loadingHelper(state, user, USER_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUser,
  updateUser
})(UserPage)
