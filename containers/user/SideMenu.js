import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

import { toggleSideMenu } from '../../actions'
import { logout } from '../../actions/login'

class UserMenu extends Component {
  constructor(props) {
    super(props);
  }

  @autobind
  handleRequestToggle(event, value) {
    this.props.toggleSideMenu();
  }

  handleMenuClick(event, value, endpoint) {
    browserHistory.push(`/me/${ endpoint }`);
    this.handleRequestToggle(event, value);
  }

  render() {
    const { login, sideMenuOpen } = this.props;
    const isAdmin = login.token.iss == "admin@example.org";

    return (
      <div>
        <Drawer open={sideMenuOpen}
                docked={false}
                containerStyle={{paddingTop: 70, zIndex: 1001}}
                onRequestChange={this.handleRequestToggle}
                overlayStyle={{zIndex: 1000}}>
          <Subheader>MY OBJECTS</Subheader>
          <MenuItem value="my-offers" primaryText="Offers" onTouchTap={this.handleMenuClick.bind(this, undefined, undefined, "offers")} />
          <MenuItem value="my-requests" primaryText="Requests" onTouchTap={this.handleMenuClick.bind(this, undefined, undefined, "requests")} />
          { isAdmin ? <Subheader>ADMIN</Subheader> : null }
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