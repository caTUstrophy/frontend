// must emulate DOM _very first_
import  '../helpers/emulateDom';

import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import unexpectedSinon from 'unexpected-sinon';
import sinon from 'sinon';

const expect = unexpected.clone()
  .use(unexpectedReact)
  .use(unexpectedSinon);

import React from 'react'
import { createRenderer, Simulate, renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils'
import { Provider } from 'react-redux';

import mockFormStore from '../helpers/mockFormStore';
import TestCaseFactory from '../helpers/TestCaseFactory';
import populateForm from '../helpers/populateForm';

import ReduxUserForm, { Fields as UserFormFields, UserForm } from '../../forms/UserForm'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';

function generateFormProps(fieldsDescription) {
  let fields = {};
  Object.keys(fieldsDescription).forEach((key) => {
    fields[key] = {
      value: '',
      touched: false,
      error: null
    }
  });

  return {
    submitting: false,
    handleSubmit: fn => fn,
    onSubmit: sinon.spy(),
    resetForm: sinon.spy(),
    fields
  };
}

function setup() {
  let props = generateFormProps(UserFormFields);

  let renderer = createRenderer();
  renderer.render(<UserForm {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

function wrappedTestFactory(component) {
  return TestCaseFactory.createFromElement(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={mockFormStore()}>
        {component}
      </Provider>
    </MuiThemeProvider>
  );
}

function testSubmitable(form, props, expectedState) {
  // ui testing
  let submitButton = form.refs['submit'];
  expect(submitButton.props.disabled, 'to be', !expectedState);

  // form level submit
  form.props.handleSubmit();
  expect(props.onSubmit, 'was called times', expectedState ? 1 : 0);
}

const sampleData = {
  FirstName: 'first',
  LastName: 'last',
  Mail: 'mail@example.com',
  Password: '#SoPassword!1'
};

describe('forms', () => {
  describe('UserForm', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output, 'to have rendered', <form>
        <Card>
          <CardHeader title="Create user" />
          <CardText />
          <CardActions />
        </Card>
      </form>);
    });

    it("shouldn't allow to submit empty", () => {
      const props = {
        onSubmit: sinon.spy()
      };
      const testCase = wrappedTestFactory(<ReduxUserForm {...props} />);
      let form = testCase.firstComponent(UserForm);

      testSubmitable(form, props, false);
    });

    it("should allow to submit when filled", () => {
      const props = {
        onSubmit: sinon.spy()
      };
      const testCase = wrappedTestFactory(<ReduxUserForm {...props} />);
      let form = testCase.firstComponent(UserForm);

      // fill form
      populateForm(form, sampleData);

      testSubmitable(form, props, true);
    });
  })
});