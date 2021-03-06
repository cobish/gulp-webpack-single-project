var path = require('path');
var webpack = require('webpack');
var config = require('./config.js');

module.exports = {
  cache: true,
  devtool: 'inline-source-map',
  entry: config.getEntry(),
  output: {
    path: path.join(config.dist),
    filename: '[name].js'
  },
  module: {
    preLoaders: [{
      test: /\.js?$/,
      exclude: [
        /node_modules/,
        path.join(config.src, 'common/lib')
      ],
      loader: 'jshint-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  jshint: {
    camelcase: true,
    eqeqeq: true,
    undef: true,
    browser: true,
    devel: true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'vendor'],
      minChunks: 3
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ]
};
