import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import DefaultPage from './containers/DefaultPage'
import UserPage from './containers/UserPage'
import UsersPage from './containers/UsersPage'
import AddUserPage from './containers/admin/AddUserPage'
import OffersPage from './containers/admin/OffersPage'
import AddOfferPage from './containers/admin/AddOfferPage'
import RequestsPage from './containers/admin/RequestsPage'
import AdminHomePage from './containers/admin/AdminHomePage'
import NotFoundPage from './containers/NotFoundPage'
import AddRequestPage from './containers/admin/AddRequestPage'


export default [
  <Route path="/" component={App}>
    <IndexRoute component={DefaultPage} />
    <Route path="admin">
      <IndexRoute component={AdminHomePage} />
      <Route path="offers">
        <IndexRoute component={OffersPage} />
        <Route path="create"
               component={AddOfferPage}/>
      </Route>
      <Route path="requests">
        <IndexRoute component={RequestsPage} />
        <Route path="create"
               component={AddRequestPage}/>
      </Route>
    </Route>
  </Route>,
  <Route path="/signup"
         component={AddUserPage} />,
  <Route path="*" component={NotFoundPage} />
];
