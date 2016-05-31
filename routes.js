import React from 'react'
import {Route} from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import UsersPage from './containers/UsersPage'
import AddUserPage from './containers/AddUserPage'
import LoginPage from './containers/LoginPage'
import OffersPage from './containers/OffersPage'
import AddOfferPage from './containers/AddOfferPage'
import RequestsPage from './containers/RequestsPage'
import AddRequestPage from './containers/AddRequestPage'

export default (
  <Route path="/" component={App}>
    <Route path="/signup"
           component={AddUserPage}/>
    <Route path="/user/:ID"
           component={UserPage}/>
    <Route path="/users"
           component={UsersPage}/>
    <Route path="/offers"
           component={OffersPage}/>
    <Route path="/offers/create"
           component={AddOfferPage}/>
    <Route path="/requests"
           component={RequestsPage}/>
    <Route path="/requests/create"
           component={AddRequestPage}/>
    <Route path="/login"
           component={LoginPage}/>
  </Route>
)
