// https://github.com/smaato/react-test-kit/blob/master/src/mockFormStore.js
// copied from https://github.com/smaato/react-test-kit/blob/ed6bfab598e2c0efc0c8343d3901f602e5d81be6/src/mockFormStore.js

import { createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

/**
 * @param {object} initialState - Specify the initial state of the store.
 */
export default function mockFormStore(initialState = {}) {
  const store = createStore((state = initialState, action) => {
    return Object.assign({}, state, {
      form: formReducer(state.form, action),
    });
  });

  return store;
}