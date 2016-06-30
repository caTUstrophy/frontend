import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

// regular users
import HomePage from './containers/HomePage';
import AddOfferPage from './containers/AddOfferPage';
import AddRequestPage from './containers/AddRequestPage';

// admin
import AdminHomePage from './containers/admin/AdminHomePage';
import ManagePage from './containers/admin/ManagePage';
import OffersPage from './containers/admin/OffersPage';
import OfferPage from './containers/admin/OfferPage';
import RequestsPage from './containers/admin/RequestsPage';
import RequestPage from './containers/admin/RequestPage';
import AddRegionPage from './containers/admin/region/AddRegionPage';
import RegionsPage from './containers/admin/region/RegionsPage';
import RegionPage from './containers/admin/region/RegionPage';

// user
import SignupPage from './containers/user/SignupPage';

// other
import NotFoundPage from './containers/misc/NotFoundPage';
import ProfilePage from "./containers/me/ProfilePage";
import MyOffersPage from "./containers/me/MyOffersPage";
import MyRequestsPage from "./containers/me/MyRequestsPage";
import NotificationPage from './containers/NotificationPage';
import NotificationsPage from './containers/NotificationsPage';

export default [
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="requests/create" component={AddRequestPage}/>
    <Route path="offers/create" component={AddOfferPage}/>
    <Route path="notifications">
      <IndexRoute component={NotificationsPage} />
      <Route path=":ID" component={NotificationPage} />
    </Route>
    <Route path="admin">
      <IndexRoute component={AdminHomePage} />
      <Route path="offers">
        <Route path=":ID" component={OfferPage} />
      </Route>
      <Route path="requests">
        <Route path=":ID" component={RequestPage} />
      </Route>
      <Route path="regions">
        <IndexRoute component={RegionsPage} />
        <Route path="create"
               component={AddRegionPage}/>
        <Route path=":ID">
          <IndexRoute component={RegionPage} />
          <Route path="requests" component={RequestsPage} />
          <Route path="offers" component={OffersPage} />
        </Route>
      </Route>
      <Route path="manage/:ID" component={ManagePage} />
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
