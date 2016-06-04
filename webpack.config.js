const webpack = require('webpack');
const path = require('path');
const precss       = require('precss');
const autoprefixer = require('autoprefixer');
const simpleVars = require('postcss-simple-vars');
const postcssMixins = require('postcss-mixins');
const postcssBEM = require('postcss-bem')({style: 'bem'});
const postcssNested = require('postcss-nested');
const colorFunctions = require('postcss-color-function');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" }
    ]
  },
  postcss: function () {
      return [precss, autoprefixer, postcssMixins, simpleVars, colorFunctions, postcssBEM, postcssNested];
  }
};

module.exports = config;
