const webpack = require('webpack');
const merge = require('webpack-merge');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  module: {
    mode: 'production',
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            shouldPrintComment: () => false,
            compact: true,
          },
        },
      },
    ],
  },
  plugins: [
    new MinifyPlugin({simplify: false, mangle: false}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
