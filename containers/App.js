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
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import LoginPage from './user/LoginPage'
import UserMenu from './user/UserMenu'
import SideMenu from './user/SideMenu'

import { resetErrorMessage, toggleSideMenu } from '../actions/userInterface'
import { tryRestoreLogin, logout, refreshLogin } from '../actions/login'
import {LOGIN_LOCAL_STORAGE_KEY} from "../actions/login";

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
        LocalStorage.removeItem(LOGIN_LOCAL_STORAGE_KEY);
        // todo: modify state!
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

    console.log('da theme', this.props.muiTheme);

    return (
      <div>
        <Toolbar noGutter={true} >
          <ToolbarGroup firstchild={true} >
            {sideMenuButton}
            <ToolbarTitle text="CaTUstrophy" onTouchTap={() => browserHistory.push('/')} style={{cursor: 'pointer'}} />
          </ToolbarGroup>
          <ToolbarGroup float={'right'} lastchild={true}>
              {<UserMenu />}
              {<SideMenu />}
          </ToolbarGroup>
        </Toolbar>
        {children}
        {this.renderErrorMessage()}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  login: PropTypes.object,
  toggleSideMenu: PropTypes.func.isRequired,
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
  logout
})(App))