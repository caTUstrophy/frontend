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

import populateForm from '../helpers/populateForm';
import wrappedTestFactory from '../helpers/wrappedTestFactory';

import ReduxUserForm, { Fields as UserFormFields, UserForm } from '../../forms/UserForm'

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

function testSubmittable(form, props, expectedState) {
  // ui testing
  let submitButton = form.refs['submit'];
  expect(submitButton.props.disabled, 'to be', !expectedState);

  // form level submit
  form.props.handleSubmit();
  expect(props.onSubmit, 'was called times', expectedState ? 1 : 0);
}

const sampleData = {
  Name: 'full name',
  PreferredName: 'preferred',
  Mail: 'mail@example.com',
  Password: '#SoPassword!1'
};
const requiredFields = Object.keys(sampleData).filter(key => UserFormFields[key].required);

export function UserFormTests() {
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

    testSubmittable(form, props, false);
  });

  it("should allow to submit when filled", () => {
    const props = {
      onSubmit: sinon.spy()
    };
    const testCase = wrappedTestFactory(<ReduxUserForm {...props} />);
    let form = testCase.firstComponent(UserForm);

    // fill form
    populateForm(form, sampleData);

    testSubmittable(form, props, true);
  });

  it("shouldn't allow to submit when data partial", () => {
    for (let field of requiredFields) {
      const props = {
        onSubmit: sinon.spy()
      };
      const testCase = wrappedTestFactory(<ReduxUserForm {...props} />);
      let form = testCase.firstComponent(UserForm);

      // fill form, but omit one property
      let partialSampleData = Object.assign({}, sampleData, {[field]: ''});
      populateForm(form, partialSampleData);

      testSubmittable(form, props, false);
    }
  });

  it("should show errors when values are missing", () => {
    for (let field of requiredFields) {
      const props = {
        onSubmit: sinon.spy()
      };
      const testCase = wrappedTestFactory(<ReduxUserForm {...props} />);
      let form = testCase.firstComponent(UserForm);

      // fill form, but omit one property
      let partialSampleData = Object.assign({}, sampleData, {[field]: ''});
      populateForm(form, partialSampleData);

      expect(form.refs[field].props.error, 'not to be', undefined);
      expect(form.refs[field].props.error, 'to be', 'Required');
    }
  });

  it("shouldn't allow to submit when email is invalid and show an error", () => {
    const props = {
      onSubmit: sinon.spy()
    };
    const testCase = wrappedTestFactory(<ReduxUserForm {...props} />);
    let form = testCase.firstComponent(UserForm);

    // fill form, but omit one property
    let partialSampleData = Object.assign({}, sampleData, {Mail: 'not an email address'});
    populateForm(form, partialSampleData);

    expect(form.refs['Mail'].props.error, 'not to be', undefined);
    expect(form.refs['Mail'].props.error, 'to be', 'Not a valid e-mail address');
    testSubmittable(form, props, false);
  });
}

export default UserFormTests