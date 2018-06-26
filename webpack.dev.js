const merge = require('webpack-merge');
const { InjectManifest } = require('workbox-webpack-plugin');

const common = require('./webpack.common.js');


module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new InjectManifest({
      swSrc: './src/sw.js'
    })
  ]
});
