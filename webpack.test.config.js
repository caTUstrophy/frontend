var config = require("./webpack.config.js");

// from https://www.npmjs.com/package/mocha-webpack#sourcemaps

config.devtool = 'cheap-module-source-map';

Object.assign(config.output, {
  // sourcemap support for IntelliJ/Webstorm
  devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
});


module.exports = config;