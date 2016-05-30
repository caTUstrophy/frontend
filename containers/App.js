import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator';

import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

import LoginPage from './LoginPage'
import { resetErrorMessage } from '../actions'
import { tryRestoreLogin } from '../actions/login'

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
    const { errorMessage } = this.props;

    return <Snackbar
          open={!!errorMessage}
          message={errorMessage || " " }
          onRequestClose={this.handleDismissClick} />;
  }

  renderLogin() {
    return <LoginPage />;
  }

  render() {
    const { children, login, url } = this.props;

    let isSignUpPage = /^\/?signup/i.test(url);
    let loginValid = login && login.expires > new Date();

    return (
      <div>
        <AppBar
          title={<span style={{cursor: 'pointer'}} onTouchTap={() => browserHistory.push('/')}>CaTUstrophy</span>}
          iconElementLeft={<div /> /* todo: remove to make menu-button appear and link to side menu */} />
        <main style={{margin: '1rem'}}>
          {this.renderErrorMessage()}
          {loginValid || isSignUpPage ? children : this.renderLogin()}
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
