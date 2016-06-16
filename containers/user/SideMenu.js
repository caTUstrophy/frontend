import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import Drawer from 'material-ui/Drawer';
import { Menu, MenuItem } from 'material-ui/Menu';
import Subheader from 'material-ui/Subheader';

import { toggleSideMenu } from '../../actions'
import { logout } from '../../actions/login'

const menuEntries = [
  {
    url: "/me/offers",
    text: "Offers"
  },
  {
    url: "/me/requests",
    text: "Requests"
  }
];
const adminMenuEntries = [,
  {
    url: "/admin/regions",
    text: "Regions"
  },
  {
    url: "/admin/offers",
    text: "All Offers"
  },
  {
    url: "/admin/requests",
    text: "All Requests"
  }
];

class UserMenu extends Component {
  constructor(props) {
    super(props);
  }

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
    const { login, sideMenuOpen } = this.props;
    let regularEntries = [<Subheader key="regular-subheader">MY ENTRIES</Subheader>]
      .concat(menuEntries.map(this.renderMenuItem));
    let adminEntries = null;
    if (login.token.iss == "admin@example.org") { // todo: hacked admin as a constant
      adminEntries = [<Subheader key="admin-subheader" style={{marginTop: 30}}>ADMIN</Subheader>]
        .concat(adminMenuEntries.map(this.renderMenuItem));
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
          </Menu>
        </Drawer>
      </div>
    );
  }
}

UserMenu.propTypes = {
  // Injected by React Redux
  sideMenuOpen: PropTypes.bool,
  toggleSideMenu: PropTypes.func.isRequired,
  // Injected by React Router

  login: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const { login, userInterface: { sideMenuOpen }} = state;
  return {
    login,
    sideMenuOpen
  }
}

export default connect(mapStateToProps, {
  toggleSideMenu,
  logout
})(UserMenu)