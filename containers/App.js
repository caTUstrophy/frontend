import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

// Needed for onTouchTap, info at https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey400, red500 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Snackbar from 'material-ui/Snackbar';

import Explore from '../components/Explore'
import LoginPage from './LoginPage'
import { resetErrorMessage } from '../actions'

const theme = getMuiTheme({
  palette: {
    primary1Color: blueGrey400,
    accent1Color: red500
  }
});

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange(nextValue) {
    browserHistory.push(`/user/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;

    console.log("em", errorMessage);

    return <Snackbar
          open={!!errorMessage}
          message={errorMessage || " " }
          onRequestClose={this.handleDismissClick} />;
  }

  renderDefaultContent(children) {
    return (
      <div>
        {this.renderErrorMessage()}
        {children}
        <FloatingActionButton style={{position: 'fixed', bottom: '2rem', right: '2rem'}}
                              secondary={true}
                              onTouchTap={() => browserHistory.push('/user/create')} >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }

  renderLogin() {
    return <LoginPage />;
  }

  render() {
    const { children, login } = this.props;

    let loginValid = !!login;

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <AppBar
            title={<span style={{cursor: 'pointer'}} onTouchTap={() => browserHistory.push('/')}>CaTUstrophy</span>}
            iconElementLeft={<div /> /* todo: remove to make menu-button appear and link to side menu */} />
          <main style={{margin: '1rem'}}>
            {loginValid ? this.renderDefaultContent(children) : this.renderLogin()}
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
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node,
  login: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  console.log('state', state);
  return {
    login: state.login,
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)
