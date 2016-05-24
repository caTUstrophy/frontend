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

import Explore from '../components/Explore'
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

  render() {
    const { children, inputValue } = this.props;
    let userId;
    if (inputValue.includes('user/')) {
      userId = inputValue.replace('user/', '');
    }

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <AppBar
            title={<span style={{cursor: 'pointer'}} onTouchTap={() => browserHistory.push('/')}>CaTUstrophy</span>}
            iconElementLeft={<div /> /* todo: remove to make menu-button appear and link to side menu */} />
          <main style={{margin: '1rem'}}>
            <Explore value={userId}
                     onChange={this.handleChange} />

            {this.renderErrorMessage()}
            {children}
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
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)
