import React, { Component, PropTypes } from 'react'

class DefaultPage extends Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{width: '40rem', margin: 'auto'}}>
          <h1>You're logged in, but this page is currently empty.</h1>
        </div>
      </div>
    )
  }
}

export default DefaultPage
