import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import IconButton from 'material-ui/IconButton/IconButton';

import LoginPage from './user/LoginPage'
import { resetErrorMessage, toggleUserMenu } from '../actions'
import { tryRestoreLogin, logout } from '../actions/login'

@muiThemeable()
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.tryRestoreLogin();
  }

  @autobind
  handleRequestClose() {
    this.props.resetErrorMessage();
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;

    return <Snackbar
          open={!!errorMessage}
          message={errorMessage || " " }
          onRequestClose={this.handleRequestClose}
          bodyStyle={{backgroundColor: 'darkred', fontFamily: this.props.muiTheme.fontFamily}} />;
  }

  @autobind
  handleRequestToggle(event, value) {
    console.log("Change requested", event, value)
    this.props.toggleUserMenu();
  }

  @autobind
  handleLogoutTap() {
    this.props.logout();
  }

  renderUserMenu() {
    const { openMenu, login } = this.props;
    const isAdmin = login.token.iss == "admin@example.org";

    return (
      <IconMenu
          open={openMenu}
          onRequestChange={this.handleRequestToggle}
          iconButtonElement={<IconButton><AccountIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>
            {/* <MenuItem value="username" primaryText="Username"/> */}
            {isAdmin ? <MenuItem value="admin-area" primaryText="Admin area" onTouchTap={() => browserHistory.push('/admin')}/> : null}
            <MenuItem value="profile" disabled={true} primaryText="Profile" />
            <MenuItem value="logout" primaryText="Logout" onTouchTap={this.handleLogoutTap} />
      </IconMenu>
    );
  }

  render() {
    const { children, login, url } = this.props;

    if (!login || login.expires < new Date()) {
      return <LoginPage />;
    }

    return (
      <div>
        <AppBar
          title={<span style={{cursor: 'pointer'}} onTouchTap={() => browserHistory.push('/')}>CaTUstrophy</span>}
          iconElementLeft={<div /> /* todo: remove to make menu-button appear and link to side menu */}
          iconElementRight={this.renderUserMenu()}
        />
        <main style={{margin: '1rem'}}>
          {this.renderErrorMessage()}
          {children}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  openMenu: PropTypes.bool,
  toggleUserMenu: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node,

  login: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    url: ownProps.location.pathname,
    login: state.login,
    errorMessage: state.errorMessage,
    openMenu: state.openMenu
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  tryRestoreLogin,
  toggleUserMenu,
  logout
})(App)