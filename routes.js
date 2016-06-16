import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'

// regular users
import HomePage from './containers/HomePage'
import AddOfferPage from './containers/AddOfferPage'
import AddRequestPage from './containers/AddRequestPage'

// admin
import AdminHomePage from './containers/admin/AdminHomePage'
import OffersPage from './containers/admin/OffersPage'
import OfferPage from './containers/admin/OfferPage'
import RequestsPage from './containers/admin/RequestsPage'
import RequestPage from './containers/admin/RequestPage'

// user
import SignupPage from './containers/user/SignupPage'

// other
import DefaultPage from './containers/misc/EmptyPage'
import NotFoundPage from './containers/misc/NotFoundPage'
import ProfilePage from "./containers/me/ProfilePage";
import MyOffersPage from "./containers/me/MyOffersPage";
import MyRequestsPage from "./containers/me/MyRequestsPage";


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
        <Route path=":ID" component={OfferPage} />
      </Route>
      <Route path="requests">
        <IndexRoute component={RequestsPage} />
        <Route path=":ID" component={RequestPage} />
      </Route>
    </Route>
    <Route path="me">
      <IndexRoute component={ProfilePage} />
      <Route path="offers">
        <IndexRoute component={MyOffersPage} />
        <Route path=":ID" component={OfferPage} />
      </Route>
      <Route path="requests">
        <IndexRoute component={MyRequestsPage} />
        <Route path=":ID" component={RequestPage} />
      </Route>
      <Route path="requests">
        <IndexRoute component={MyRequestsPage} />
      </Route>
    </Route>
  </Route>,
  <Route path="/signup"
         component={SignupPage} />,
  <Route path="*" component={NotFoundPage} />
];
