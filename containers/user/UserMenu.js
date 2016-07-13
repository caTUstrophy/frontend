import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import IconButton from 'material-ui/IconButton/IconButton';

import { toggleUserMenu } from '../../actions'
import { logout } from '../../actions/login'

import { isUserAdminAnywhere } from '../../helpers/UserPermissionChecks'

class UserMenu extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  handleRequestToggle() {
    this.props.toggleUserMenu();
  }

  @autobind
  handleLogoutTap() {
    this.props.logout();
    browserHistory.push(`/`)
  }

  render() {
    const { userMenuOpen, profile } = this.props;

    return (
      <IconMenu
        open={userMenuOpen}
        onRequestChange={this.handleRequestToggle}
        iconButtonElement={<IconButton><AccountIcon color="white" /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
        {/* <MenuItem value="username" primaryText="Username"/> */}
        {isUserAdminAnywhere(profile) ? <MenuItem value="admin-area" primaryText="Admin area" onTouchTap={() => browserHistory.push('/admin')}/> : null}
        <MenuItem value="profile" onTouchTap={() => browserHistory.push('/me')} primaryText="Your Profile" />
        <MenuItem value="logout" primaryText="Logout" onTouchTap={this.handleLogoutTap} />
      </IconMenu>
    );
  }
}

UserMenu.propTypes = {
  // Injected by React Redux
  userMenuOpen: PropTypes.bool,
  toggleUserMenu: PropTypes.func.isRequired,
  // Injected by React Router

  profile: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const { profile, userInterface: { userMenuOpen }} = state;
  return {
    profile,
    userMenuOpen
  }
}

export default connect(mapStateToProps, {
  toggleUserMenu,
  logout
})(UserMenu)