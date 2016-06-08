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
import UserMenu from './user/UserMenu'

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
          iconElementRight={<UserMenu />}
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
  // Injected by React Router
  children: PropTypes.node,

  login: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const { login, userInterface: { errorMessage }} = state;
  return {
    url: ownProps.location.pathname,
    login,
    errorMessage
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  tryRestoreLogin
})(App)