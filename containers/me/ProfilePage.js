import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { PROFILE_REQUEST, loadUserProfile } from '../../actions/profile'
import Profile from '../../components/Profile'
import Center from '../layout/Center';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadUserProfile();
  }

  @autobind
  navigateToEditProfile() {
    browserHistory.push('/me/edit');
  }

  render() {
    const { profile, loading } = this.props;

    if (loading) {
      return <h1><i>Loading your profile...</i></h1>
    }

    return (
      <Center>
        <Profile profile={profile} isOwnProfile={true} navigateToEditProfile={this.navigateToEditProfile} />
      </Center>
    )
  }
}

ProfilePage.propTypes = {
  loadUserProfile: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile,
    loading: state.loading.loading.includes(PROFILE_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUserProfile
})(ProfilePage)