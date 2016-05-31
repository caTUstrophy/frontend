import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import DefaultPage from './containers/misc/EmptyPage'
import AddUserPage from './containers/user/SignupPage'
import OffersPage from './containers/admin/OffersPage'
import AddOfferPage from './containers/AddOfferPage'
import RequestsPage from './containers/admin/RequestsPage'
import AdminHomePage from './containers/admin/AdminHomePage'
import NotFoundPage from './containers/misc/NotFoundPage'
import AddRequestPage from './containers/AddRequestPage'


export default [
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="requests">
      <IndexRoute component={DefaultPage} />
      <Route path="create"
             component={AddRequestPage}/>
    </Route>
    <Route path="offers">
      <IndexRoute component={DefaultPage} />
      <Route path="create"
             component={AddOfferPage}/>
    </Route>
    <Route path="admin">
      <IndexRoute component={AdminHomePage} />
      <Route path="offers">
        <IndexRoute component={OffersPage} />
      </Route>
      <Route path="requests">
        <IndexRoute component={RequestsPage} />
      </Route>
    </Route>
  </Route>,
  <Route path="/signup"
         component={AddUserPage} />,
  <Route path="*" component={NotFoundPage} />
];
