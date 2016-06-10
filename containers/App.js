import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import Moment from 'moment';
import autobind from 'autobind-decorator';

import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

import LoginPage from './user/LoginPage'
import UserMenu from './user/UserMenu'

import { resetErrorMessage } from '../actions/userInterface'
import { tryRestoreLogin, logout, refreshLogin } from '../actions/login'

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.tryRestoreLogin();

    this.loginRefreshFunction = setInterval(() => {
      const { login, logout, refreshLogin } = this.props;

      if (!login) {
        return;
      }

      if (login.expires < new Date()) {
        logout();
      }

      let refreshTarget = new Moment(login.expires).subtract(5, 'minutes');
      if (refreshTarget.toDate() < new Date()) {
        refreshLogin();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.loginRefreshFunction);
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
  login: PropTypes.object,

  resetErrorMessage: PropTypes.func.isRequired,
  refreshLogin: PropTypes.func.isRequired,
  tryRestoreLogin: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,

  // Injected by React Router
  children: PropTypes.node,
  // Injected by muiThemeable
  muiTheme: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {
  const { login, userInterface: { errorMessage }} = state;
  return {
    url: ownProps.location.pathname,
    login,
    errorMessage
  }
}

export default muiThemeable()(connect(mapStateToProps, {
  resetErrorMessage,
  tryRestoreLogin,
  refreshLogin,
  logout
})(App))