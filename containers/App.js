import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import Moment from 'moment';
import autobind from 'autobind-decorator';
import LocalStorage from '../helpers/LocalStorage';

import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton/IconButton';

import LoginPage from './user/LoginPage'
import UserMenu from './user/UserMenu'
import SideMenu from './user/SideMenu'

import { resetErrorMessage, toggleSideMenu } from '../actions/userInterface'
import { tryRestoreLogin, logoutAfterTimeout, refreshLogin } from '../actions/login'

export class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    login: PropTypes.object,
    toggleSideMenu: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func.isRequired,
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
  handleRequestClose() {
    this.props.resetErrorMessage();
  }

  @autobind
  handleToggleSideMenu(event, value) {
    this.props.toggleSideMenu();
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;

    // todo: render notifications too. another snackbar but different color? same, but change color as needed?

    return <Snackbar
          open={!!errorMessage}
          message={errorMessage || " " }
          onRequestClose={this.handleRequestClose}
          bodyStyle={{backgroundColor: 'darkred', fontFamily: this.props.muiTheme.fontFamily}} />;
  }

  render() {
    const { children, login, url, sideMenuOpen } = this.props;

    if (!login || login.expires < new Date()) {
      return <LoginPage />;
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
        <main>
          {<SideMenu />}
          {this.renderErrorMessage()}
          {children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { login, userInterface: { errorMessage, sideMenuOpen }} = state;
  return {
    url: ownProps.location.pathname,
    login,
    errorMessage,
    sideMenuOpen
  }
}
 
export default muiThemeable()(connect(mapStateToProps, {
  toggleSideMenu,
  resetErrorMessage,
  tryRestoreLogin,
  refreshLogin,
  logoutAfterTimeout
})(App))