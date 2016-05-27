import jsdom from 'jsdom-global'

import expect from 'expect'
import expectJSX from 'expect-jsx'
expect.extend(expectJSX);

import React from 'react'
import { createRenderer, Simulate, renderIntoDocument } from 'react-addons-test-utils'
import { Fields as UserFormFields, UserForm } from '../../forms/UserForm'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'

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

function mount(Component, props) {
  return renderIntoDocument(<Component { ...props } />);
}

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
    onSubmit: expect.createSpy(),
    resetForm: expect.createSpy(),
    fields
  };
}

console.dir(jsdom());

describe('forms', () => {
  describe('UserForm', () => {
    before(function () {
      this.jsdom = jsdom();
      console.dir(this);
      // console.dir(document);
    });

    after(function () {
      this.jsdom()
    });

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('form');

      let card = output.props.children;
      expect(card.type).toBe(Card);

      let [ cardHeader, cardText, cardActions ] = card.props.children;
      expect(cardHeader.type).toBe(CardHeader);
      expect(cardText.type).toBe(CardText);
      expect(cardActions.type).toBe(CardActions);
    });

    it("shouldn't allow to submit empty", () => {
      const { output, props } = setup();
      const app = mount(output);
      Simulate.submit(app);
      // output.simulate('submit');
      expect(props.onSubmit).toNotHaveBeenCalled();
      console.dir(output);
    })

    it('should call onSubmit if all fields are filled', () => {
      const { output, props } = setup();
      console.dir(output);
      let input = output.props.children[1]
      input.props.onSave('')
      expect(props.addTodo.calls.length).toBe(0)
      input.props.onSave('Use Redux')
      expect(props.addTodo.calls.length).toBe(1)
    })
  })
});