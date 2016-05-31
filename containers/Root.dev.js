import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import DevTools from './DevTools'
import { Router } from 'react-router'

import MaterialProvider from '../containers/MaterialProvider'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <MaterialProvider>
          <div style={{height: '100%'}}>
            <Router history={history} routes={routes} />
            <DevTools />
          </div>
        </MaterialProvider>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
