import paginate from './paginate'
import userInterface from './userInterface'
import login from './login'
import location from './location'
import entities from './entities'
import mappings from './mappings'
import error from './error'
import profile from './profile'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

// Updates the pagination data for different actions.
const pagination = combineReducers({
});

const rootReducer = combineReducers({
  login,
  entities,
  mappings,
  profile,
  location,
  // pagination,
  userInterface,
  error,
  routing,
  form: formReducer
});

export default rootReducer