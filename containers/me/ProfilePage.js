import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { loadUserProfile } from '../../actions/profile'
import Profile from '../../components/Profile'

function loadData(props) {
  props.loadUserProfile();
}

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  render() {
    const { profile } = this.props;

    if (!profile) {
      return <h1><i>Loading your profile...</i></h1>
    }

    return (
      <div style={{width: '40rem', margin: '0 auto'}}>
        <Profile profile={profile}/>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  loadUserProfile: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, {
  loadUserProfile
})(ProfilePage)