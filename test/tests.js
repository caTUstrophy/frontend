import AppTests from './containers/App'
import AdminHomePageTests from './containers/admin/AdminHomePage'
import UserFormTests from "./forms/UserFormTests";
import UserInterfaceReducerTests from './reducers/userInterface';

describe('containers', () => {
  describe('App', AppTests);
  describe('AdminHomePage', AdminHomePageTests);
});
describe('forms', () => {
  describe('UserForm', UserFormTests);
});
describe('reducers', () => {
  describe('userInterface', UserInterfaceReducerTests);
});