import { set as _set } from 'lodash'

import {ADMINS_SUCCESS} from "../actions/admins";

export default function (state = { regionAdmins: {} }, action) {

  if(action.response && action.response.reference && action.response.reference.key) {
    return Object.assign({}, state, _set({}, action.response.reference.key, action.response.result) );
  }
  
  if (action.type == ADMINS_SUCCESS && action.response.reference && action.response.reference.regionId) {
    return Object.assign({}, state, { regionAdmins: { [action.response.reference.regionId]: action.response.result } });
  }

  return state;
}
