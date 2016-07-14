import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { PROFILE_REQUEST, loadUserProfile } from '../../actions/profile'
import Profile from '../../components/Profile'
import Center from '../layout/Center';
import Loading from '../misc/Loading';
import loadingHelper from "../helpers/loadingHelper";

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
      return <Loading resourceName="your profile" />;
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
  const profile = state.profile;
  
  return {
    profile,
    loading: loadingHelper(state, profile, PROFILE_REQUEST)
  }
}

export default connect(mapStateToProps, {
  loadUserProfile
})(ProfilePage)