import forOwn from 'lodash/forOwn';
import { Simulate, findRenderedDOMComponentWithTag } from 'react-addons-test-utils';

export default function populateForm(form, data) {
  forOwn(data, (value, key) => {
    let input = findRenderedDOMComponentWithTag(form.refs[key], 'input');
    Simulate.change(input, { target: { value: value }});
  });
}