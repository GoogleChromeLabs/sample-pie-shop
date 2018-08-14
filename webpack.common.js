const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BROWSERS = [
  'last 2 chrome versions',
  'last 2 safari versions',
  'last 2 firefox versions',
  'last 2 edge versions',
];

module.exports = {
  entry: {
    'app_main.js': './src/client/js/app-main.js',
    'home_main.js': './src/client/js/home-main.js',
    'category_main.js': './src/client/js/category-main.js',
    'product_main.js': './src/client/js/product-main.js',
    'cart_main.js': './src/client/js/cart-main.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: BROWSERS,
              },
              modules: false,
            }],
          ],
          plugins: ['syntax-dynamic-import'],
          babelrc: false,
        },
      },
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({use: 'css-loader'}),
    }],
  },
  output: {
    filename: 'js/[name]',
    chunkFilename: 'js/chunk-[name]',
    path: path.resolve(__dirname, 'dist/static'),
  },
  plugins: [
    new ExtractTextPlugin('styles/style.css'),
  ],
};
