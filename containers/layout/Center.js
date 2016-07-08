import React, { Component } from 'react'

export default class Center extends Component {
  render() {
    const { children } = this.props;

    return (
      <div style={{width: '40rem', margin: '5rem auto 0'}}>
        {children}
      </div>
    )
  }
}