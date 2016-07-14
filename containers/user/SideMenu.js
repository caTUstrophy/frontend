import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import Drawer from 'material-ui/Drawer';
import { Menu, MenuItem } from 'material-ui/Menu';
import Subheader from 'material-ui/Subheader';

import { toggleSideMenu } from '../../actions'
import { logout } from '../../actions/login'

import { isUserAdminAnywhere, isUserSuperAdmin } from '../../helpers/UserPermissionChecks'

const menuEntries = [
  {
    url: "/me/offers",
    text: "Offers"
  },
  {
    url: "/me/requests",
    text: "Requests"
  },
  {
    url: "/me/matchings",
    text: "Matchings"
  }
];
const adminMenuEntries = [,
  {
    url: "/admin",
    text: "Dashboard"
  },
  {
    url: "/admin/regions",
    text: "Regions"
  }
];
const systemMenuEntries = [,
  {
    url: "/system/users",
    text: "Users"
  }
];

class SideMenu extends Component {
  static propTypes = {
    // Injected by React Redux
    sideMenuOpen: PropTypes.bool,
    toggleSideMenu: PropTypes.func.isRequired,
    login: PropTypes.object,
    profile: PropTypes.object
  };

  @autobind
  handleRequestToggle() {
    this.props.toggleSideMenu();
  }

  @autobind
  handleChange(event, value) {
    browserHistory.push(value);
    this.handleRequestToggle(event, value);
  }

  renderMenuItem(entry) {
    return <MenuItem key={entry.url} value={entry.url} primaryText={entry.text} />;
  }

  render() {
    const { profile, sideMenuOpen } = this.props;
    let regularEntries = [<Subheader key="regular-subheader">MY ENTRIES</Subheader>]
      .concat(menuEntries.map(this.renderMenuItem));
    
    let adminEntries = null;
    if (isUserAdminAnywhere(profile) || isUserSuperAdmin(profile)) {
      adminEntries = [<Subheader key="admin-subheader" style={{marginTop: 30}}>ADMIN</Subheader>]
        .concat(adminMenuEntries.map(this.renderMenuItem));
    }
    
    let systemEntries;
    if (isUserSuperAdmin(profile)) {
      systemEntries = [<Subheader key="system-subheader" style={{marginTop: 30}}>SYSTEM</Subheader>]
        .concat(systemMenuEntries.map(this.renderMenuItem));
    }


    return (
      <div>
        <Drawer open={sideMenuOpen}
                docked={false}
                containerStyle={{paddingTop: 70, zIndex: 1001}}
                onRequestChange={this.handleRequestToggle}
                overlayStyle={{zIndex: 1000}}>
          <Menu onChange={this.handleChange} value={null}>
            { regularEntries }
            { adminEntries }
            { systemEntries }
          </Menu>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { profile, userInterface: { sideMenuOpen }} = state;
  return {
    profile,
    sideMenuOpen
  }
}

export default connect(mapStateToProps, {
  toggleSideMenu,
  logout
})(SideMenu)