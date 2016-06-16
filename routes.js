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
import AddRegionPage from './containers/admin/region/AddRegionPage'
import RegionsPage from './containers/admin/region/RegionsPage'
import RegionPage from './containers/admin/region/RegionPage'

// user
import SignupPage from './containers/user/SignupPage'

// other
import DefaultPage from './containers/misc/EmptyPage'
import NotFoundPage from './containers/misc/NotFoundPage'
import MyOffersPage from "./containers/me/MyOffersPage";
import MyRequestsPage from "./containers/me/MyRequestsPage";


export default [
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="requests/create" component={AddRequestPage}/>
    <Route path="offers/create" component={AddOfferPage}/>
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
      <Route path="regions">
        <IndexRoute component={RegionsPage} />
        <Route path="create"
               component={AddRegionPage}/>
        <Route path=":ID" component={RegionPage} />
      </Route>
    </Route>
    <Route path="me">
      <IndexRoute component={DefaultPage} />
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
