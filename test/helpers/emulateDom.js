import domino from 'domino'

if (typeof document === 'undefined') {
  global.window = domino.createWindow('');
  global.document = global.window.document;
  global.navigator = { userAgent: 'domino' };

  for (let key in global.window) {
    if (!global[key]) {
      global[key] = global.window[key];
    }
  }
}