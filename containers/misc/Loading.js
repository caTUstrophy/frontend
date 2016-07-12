import React, { Component, PropTypes } from 'react'

import CircularProgress from 'material-ui/CircularProgress';

import Center from '../layout/Center'

class Loading extends Component {
  static propTypes = {
    resourceName: PropTypes.string
  };
  
  render() {
    let text = "Loading...";
    if (this.props.resourceName) {
      text = `Loading ${ this.props.resourceName }...`;
    }
    return (
      <Center style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
        <CircularProgress style={{marginBottom: '2rem'}} />
        {this.props.children || <span style={{color: 'gray'}}>{text}</span>}
      </Center>
    )
  }
}

export default Loading
