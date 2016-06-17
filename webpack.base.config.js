var path = require('path');
var webpack = require('webpack');
var environment = require('./environment.js');

const environmentPlugin = new webpack.DefinePlugin({
  __API_ROOT_URL__: JSON.stringify(environment.apiRootUrl),
  __USE_FRONTEND_CACHES__: JSON.stringify(environment.useFrontendCaches)
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    environmentPlugin,
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /sinon\/pkg\/sinon\.js/,
        loader: 'imports?define=>false,require=>false'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          "presets": ["es2015", "react", "stage-0"],
          "plugins": ["transform-decorators-legacy", "transform-object-rest-spread"],
          "env": {
            "development": {
              "presets": ["react-hmre"]
            }
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    alias: {
      'sinon': 'sinon/pkg/sinon'
    }
  }
};
