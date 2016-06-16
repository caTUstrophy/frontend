// must emulate DOM _very first_
import  '../../helpers/emulateDom';

import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import unexpectedSinon from 'unexpected-sinon';
import sinon from 'sinon';

const expect = unexpected.clone()
  .use(unexpectedReact)
  .use(unexpectedSinon);

import React from 'react'
import { createRenderer, Simulate, renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils'

import Card from 'material-ui/Card';

import failOnConsoleError from '../../helpers/failOnConsoleError';

import { AdminHomePage } from '../../../containers/admin/AdminHomePage';
import RequestList from '../../../components/RequestList'
import OfferList from '../../../components/OfferList'

function setup(customProps) {
  let props = {
    requests: [],
    offers: [],
    loadRequests: sinon.spy(),
    loadOffers: sinon.spy()
  };
  Object.assign(props, customProps);
  
  let renderer = createRenderer();
  renderer.render(<AdminHomePage {...props} />);
  let output = renderer.getRenderOutput();
  
  return {
    props,
    output,
    renderer
  }
}
export function AdminHomePageTests () {
  it('should render correctly', failOnConsoleError(() => {
    const {renderer, props} = setup();
    
    expect(renderer, 'to have rendered',
      <div>
        <Card />
        <Card />
      </div>
    );
    
    expect(renderer, 'to contain', <OfferList offers={props.offers} onTouchTapItem={expect.it('to be a', Function)}/>);
    expect(renderer, 'to contain', <RequestList requests={props.requests}
                                                onTouchTapItem={expect.it('to be a', Function)}/>);
  }));
}

export default AdminHomePageTests