import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import cleanBeforeSubmit from '../../schemas/helpers/cleanBeforeSubmit'
import { UserFields } from '../../schemas/UserSchema'

import { PROFILE_REQUEST, loadUserProfile, updateUserProfile, UPDATE_PROFILE_SUCCESS } from '../../actions'
import UserForm from '../../forms/UserForm';

import Center from '../layout/Center';
import Loading from '../misc/Loading'
import loadingHelper from "../helpers/loadingHelper";

const cleanUserBeforeSubmit = cleanBeforeSubmit(UserFields)

class EditProfilePage extends Component {
  static propTypes = {
    loadUserProfile: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadUserProfile();
  }

  @autobind
  handleSubmit(user) {
    let submittableUser = cleanUserBeforeSubmit(user);
    this.props.updateUserProfile(submittableUser)
      .then(result => {
        if (result.type == UPDATE_PROFILE_SUCCESS) {
          browserHistory.push('/me')
        }
      }); // todo: handle error cases
  }

  render() {
    const { profile, loading } = this.props;

    if (loading) {
      return <Loading resourceName="your profile" />;
    }

    return (
      <Center>
        <UserForm user={profile} onSubmit={this.handleSubmit} />
      </Center>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const profile = state.profile;
  
  return {
    profile,
    loading: loadingHelper(state, profile, PROFILE_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUserProfile, updateUserProfile
})(EditProfilePage)