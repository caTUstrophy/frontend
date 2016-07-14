import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import autobind from 'autobind-decorator';

import muiThemeable from 'material-ui/styles/muiThemeable';
import Snackbar from 'material-ui/Snackbar';

import { resetErrorMessage, resetNotificationMessage } from '../actions/userInterface'

export class Main extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    resetNotificationMessage: PropTypes.func.isRequired,

    // Injected by React Router
    children: PropTypes.node,
    // Injected by muiThemeable
    muiTheme: PropTypes.object.isRequired
  };
  
  @autobind
  handleRequestCloseErrorMessage() {
    this.props.resetErrorMessage();
  }
  
  @autobind
  handleRequestCloseNotificationMessage() {
    this.props.resetNotificationMessage();
  }

  render() {
    const { errorMessage, notificationMessage, children } = this.props;

    // todo: render notifications too. another snackbar but different color? same, but change color as needed?

    return <main style={{marginTop: this.props.muiTheme.toolbar.height}}>
      <Snackbar
        open={!!errorMessage}
        message={errorMessage || " " }
        onRequestClose={this.handleRequestCloseErrorMessage}
        bodyStyle={{backgroundColor: 'darkred', fontFamily: this.props.muiTheme.fontFamily}} />
      <Snackbar
        open={!!notificationMessage}
        message={notificationMessage || " " }
        onRequestClose={this.handleRequestCloseNotificationMessage}
        bodyStyle={{backgroundColor: 'darkgreen', fontFamily: this.props.muiTheme.fontFamily}} />
      {children}
    </main>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.userInterface.errorMessage,
    notificationMessage: state.userInterface.notificationMessage
  }
}
 
export default muiThemeable()(connect(mapStateToProps, {
  resetErrorMessage,
  resetNotificationMessage
})(Main))