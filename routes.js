import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import UsersPage from './containers/UsersPage'
import AddUserPage from './containers/AddUserPage'
import LoginPage from './containers/LoginPage'

export default (
  <Route path="/" component={App}>
    <Route path="/signup"
           component={AddUserPage} />
    <Route path="/user/:ID"
           component={UserPage} />
    <Route path="/users"
           component={UsersPage} />
    <Route path="/login"
           component={LoginPage} />
  </Route>
)
