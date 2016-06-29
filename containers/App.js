import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import Moment from 'moment';
import autobind from 'autobind-decorator';

import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import Main from './Main'
import LoginPage from './user/LoginPage'
import UserMenu from './user/UserMenu'
import SideMenu from './user/SideMenu'

import { toggleSideMenu } from '../actions/userInterface'
import { tryRestoreLogin, logoutAfterTimeout, refreshLogin } from '../actions/login'

export class App extends Component {
  static propTypes = {
    // Injected by React Redux
    login: PropTypes.object,
    toggleSideMenu: PropTypes.func.isRequired,
    refreshLogin: PropTypes.func.isRequired,
    tryRestoreLogin: PropTypes.func.isRequired,
    logoutAfterTimeout: PropTypes.func.isRequired,

    // Injected by React Router
    children: PropTypes.node,
    // Injected by muiThemeable
    muiTheme: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.tryRestoreLogin();

    this.loginRefreshFunction = setInterval(() => {
      const { login, logoutAfterTimeout, refreshLogin } = this.props;

      if (!login) {
        return;
      }

      if (login.expires < new Date()) {
        logoutAfterTimeout();
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
  handleToggleSideMenu(event, value) {
    this.props.toggleSideMenu();
  }

  render() {
    const { children, login, url, sideMenuOpen } = this.props;

    if (!login || login.expires < new Date()) {
      if (url == '/') {
        return <Main>
          <div style={{width: '40rem', margin: '5rem auto 0'}}>
            <h1>This page is so landing.</h1>
            <RaisedButton onTouchTap={() => browserHistory.push('/login')} label="login" /> &nbsp;
            <RaisedButton onTouchTap={() => browserHistory.push('/signup')} label="sign up" />
          </div>
        </Main>;
      }
      return <Main><LoginPage /></Main>;
    }

    let sideMenuButton = <IconButton onTouchTap={this.handleToggleSideMenu}>
      {sideMenuOpen ? <CloseIcon color="white"/> : <MenuIcon color="white"/>}
    </IconButton>;

    return (
      <div>
        <AppBar
          title={<span style={{cursor: 'pointer'}} onTouchTap={() => browserHistory.push('/')}>CaTUstrophy</span>}
          iconElementLeft={sideMenuButton}
          iconElementRight={<UserMenu />}
        />
        <Main>
          <SideMenu />
          {children}
        </Main>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { login, userInterface: { sideMenuOpen }} = state;
  return {
    url: ownProps.location.pathname,
    login,
    sideMenuOpen
  }
}
 
export default muiThemeable()(connect(mapStateToProps, {
  toggleSideMenu,
  tryRestoreLogin,
  refreshLogin,
  logoutAfterTimeout
})(App))