import React, { Component, PropTypes } from 'react'

import Center from '../layout/Center'

class EmptyPage extends Component {
  render() {
    return (
      <Center>
        <h1>You're logged in, but this page is currently empty.</h1>
      </Center>
    )
  }
}

export default EmptyPage
