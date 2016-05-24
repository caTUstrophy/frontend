import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import UsersPage from './containers/UsersPage'
import RepoPage from './containers/RepoPage'

export default (
  <Route path="/" component={App}>
    <Route path="/user/:userId"
           component={UserPage} />
    <Route path="/users"
           component={UsersPage} />
  </Route>
)
