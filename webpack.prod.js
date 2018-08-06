const webpack = require('webpack');
const merge = require('webpack-merge');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  mode: 'production',
  module: {
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
    new MinifyPlugin({ simplify: false, mangle: false }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new InjectManifest({
      swSrc: './src/sw.prod.js',
      swDest: 'sw.js',
      globDirectory: 'dist/static',
      globPatterns: [
        'styles/*.css',
        'images/icons/image-fallback.svg',
      ],
      templatedUrls: {
        '/?fragment=true': [
          '../templates/views/index.hbs',
          '../templates/partials/*.hbs',
        ],
        '/app-shell': [
          '../server/routes/app-shell.js',
          '../templates/layouts/layout.hbs',
          '../templates/views/app-shell.hbs',
          // POI: This is relying on all partials now, probably not all needed.
          '../templates/partials/*.hbs',
        ],
      },
    })
  ],
});
