import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

// regular users
import HomePage from './containers/HomePage';
import AddOfferPage from './containers/AddOfferPage';
import AddRequestPage from './containers/AddRequestPage';

// admin
import AdminHomePage from './containers/admin/AdminHomePage'
import ManagePage from './containers/admin/ManagePage'
import ManageAdminsPage from './containers/admin/ManageAdminsPage'
import OffersPage from './containers/admin/OffersPage'
import MatchingsPage from './containers/admin/MatchingsPage'
import MatchingPage from './containers/admin/MatchingPage'
import RequestsPage from './containers/admin/RequestsPage'
import AddRegionPage from './containers/admin/region/AddRegionPage'
import EditRegionPage from './containers/admin/region/EditRegionPage'
import RegionsPage from './containers/admin/region/RegionsPage'
import RegionPage from './containers/admin/region/RegionPage'

// system
import UserPage from './containers/system/UserPage'
import UsersPage from './containers/system/UsersPage'

// user
import SignupPage from './containers/user/SignupPage';

// posts
import EditOfferPage from './containers/posts/EditOfferPage'
import OfferPage from './containers/posts/OfferPage'
import EditRequestPage from './containers/posts/EditRequestPage'
import RequestPage from './containers/posts/RequestPage'

// me
import ProfilePage from "./containers/me/ProfilePage";
import EditProfilePage from "./containers/me/EditProfilePage";
import MyOffersPage from "./containers/me/MyOffersPage";
import MyRequestsPage from "./containers/me/MyRequestsPage";
import MyMatchingsPage from "./containers/me/MyMatchingsPage";

// other
import DefaultPage from './containers/misc/EmptyPage'
import NotFoundPage from './containers/misc/NotFoundPage'
import NotificationPage from './containers/NotificationPage';
import NotificationsPage from './containers/NotificationsPage';

export default [
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={HomePage}/>
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
      <Route path="matchings">
        <Route path=":ID" component={MatchingPage} />
      </Route>
      <Route path="regions">
        <IndexRoute component={RegionsPage} />
        <Route path="create"
               component={AddRegionPage}/>
        <Route path=":ID">
          <IndexRoute component={RegionPage} />
          <Route path="requests" component={RequestsPage} />
          <Route path="offers" component={OffersPage} />
          <Route path="matchings" component={MatchingsPage} />
          <Route path="admins" component={ManageAdminsPage} />
          <Route path="edit" component={EditRegionPage} />
        </Route>
      </Route>
      <Route path="manage/:ID" component={ManagePage} />
    </Route>
    <Route path="system">
      <IndexRoute component={DefaultPage} />
      <Route path="users">
        <IndexRoute component={UsersPage} />
        <Route path=":ID" component={UserPage} />
      </Route>
    </Route>
    <Route path="me">
      <IndexRoute component={ProfilePage} />
      <Route path="edit" component={EditProfilePage} />
      <Route path="offers">
        <IndexRoute component={MyOffersPage} />
        <Route path=":ID">
          <IndexRoute component={OfferPage} />
          <Route path="edit" component={EditOfferPage} />
        </Route>
      </Route>
      <Route path="matchings">
        <IndexRoute component={MyMatchingsPage} />
        <Route path=":ID" component={MatchingPage} />
      </Route>
      <Route path="requests">
        <IndexRoute component={MyRequestsPage} />
        <Route path=":ID">
          <IndexRoute component={RequestPage} />
          <Route path="edit" component={EditRequestPage} />
        </Route>
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