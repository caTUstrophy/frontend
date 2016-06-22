var config = require("./webpack.config.js");

// enable react HMR
config.module.loaders.forEach((loader) => {
  if (loader.test.test('.js')) {
    loader.query.plugins.push("__coverage__");
  }
});

module.exports = config;