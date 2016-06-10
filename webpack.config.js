var webpack = require('webpack');

var config = require("./webpack.base.config.js");

//Get a handle the base config's plugins array and add the plugin
config.plugins = config.plugins || [ ];
config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;