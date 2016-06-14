import React from 'react';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import mockFormStore from '../helpers/mockFormStore';
import TestCaseFactory from '../helpers/TestCaseFactory';

export default function wrappedTestFactory(component) {
  return TestCaseFactory.createFromElement(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={mockFormStore()}>
        {component}
      </Provider>
    </MuiThemeProvider>
  );
}
