import unexpected from 'unexpected';
import unexpectedSinon from 'unexpected-sinon';
import sinon from 'sinon';

const expect = unexpected.clone()
  .use(unexpectedSinon);

export default function failOnConsoleError(test) {
  return () => {
    let consoleErrorStub = sinon.stub(console, 'error');

    try {
      let testReturnValue = test();
      
      expect(consoleErrorStub, 'was not called');

      return testReturnValue;
    } finally  {
      console.error.restore();
    }
  };
}