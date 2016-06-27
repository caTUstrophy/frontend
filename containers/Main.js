import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import autobind from 'autobind-decorator';

import muiThemeable from 'material-ui/styles/muiThemeable';
import Snackbar from 'material-ui/Snackbar';

import { resetErrorMessage } from '../actions/userInterface'

export class Main extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,

    // Injected by React Router
    children: PropTypes.node,
    // Injected by muiThemeable
    muiTheme: PropTypes.object.isRequired
  };

  @autobind
  handleRequestClose() {
    this.props.resetErrorMessage();
  }

  render() {
    const { errorMessage, children } = this.props;

    // todo: render notifications too. another snackbar but different color? same, but change color as needed?

    return <main>
      <Snackbar
        open={!!errorMessage}
        message={errorMessage || " " }
        onRequestClose={this.handleRequestClose}
        bodyStyle={{backgroundColor: 'darkred', fontFamily: this.props.muiTheme.fontFamily}} />
      {children}
    </main>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.userInterface.errorMessage
  }
}
 
export default muiThemeable()(connect(mapStateToProps, {
  resetErrorMessage
})(Main))