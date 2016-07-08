import React, { Component } from 'react'

export default class Center extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="ctuy-center" style={this.props.style}>
        {children}
      </div>
    )
  }
}