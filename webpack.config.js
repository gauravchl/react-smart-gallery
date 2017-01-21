var path = require('path');
var webpack = require('webpack');


var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'image-story.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: APP_DIR,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};

module.exports = config;
