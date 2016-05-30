import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import UsersPage from './containers/UsersPage'
import AddUserPage from './containers/AddUserPage'
import OffersPage from './containers/OffersPage'
import RequestsPage from './containers/RequestsPage'
import NotFoundPage from './containers/NotFoundPage'

export default [
  <Route path="/" component={App}>
    <Route path="/signup"
           component={AddUserPage} />
    <Route path="/user/:ID"
           component={UserPage} />
    <Route path="/users"
           component={UsersPage} />
    <Route path="/offers"
           component={OffersPage} />
    <Route path="/requests"
           component={RequestsPage} />
  </Route>,
  <Route path="*" component={NotFoundPage} />
];
