const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const common = require('./webpack.common.js');


module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin(['./src/sw.js'])
  ]
});
