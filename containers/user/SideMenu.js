import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

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

  render() {
    const { sideMenuOpen } = this.props;

    return (
      <div>
        <Drawer open={sideMenuOpen}
                docked={false}
                containerStyle={{paddingTop: 70}}
                onRequestChange={this.handleRequestToggle}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
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