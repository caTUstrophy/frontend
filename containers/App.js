import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

// Needed for onTouchTap, info at https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import autobind from 'autobind-decorator';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey400, red500 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import LoginPage from './LoginPage'
import { resetErrorMessage } from '../actions'
import { tryRestoreLogin } from '../actions/login'

const theme = getMuiTheme({
  palette: {
    primary1Color: blueGrey400,
    accent1Color: red500
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.tryRestoreLogin();
  }

  @autobind
  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  renderLogin() {
    return <LoginPage />;
  }

  render() {
    const { children, login, url } = this.props;

    let isSignUpPage = /^\/?signup/i.test(url);
    let loginValid = login && login.expires > new Date();

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <AppBar
            title={<span style={{cursor: 'pointer'}} onTouchTap={() => browserHistory.push('/')}>CaTUstrophy</span>}
            iconElementLeft={<div /> /* todo: remove to make menu-button appear and link to side menu */} />
          <main style={{margin: '1rem'}}>
        	{this.renderErrorMessage()}
            {loginValid || isSignUpPage ? children : this.renderLogin()}
          </main>
        </div>
      </MuiThemeProvider>
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
  return {
    url: ownProps.location.pathname,
    login: state.login,
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  tryRestoreLogin
})(App)
