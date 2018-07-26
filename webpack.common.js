const path = require('path');

const BROWSERS = [
  'last 2 chrome versions',
  'last 2 safari versions',
  'last 2 firefox versions',
  'last 2 edge versions',
];

module.exports = {
  entry: {
    app_main: './src/client/js/app-main.js',
    cart_main: './src/client/js/cart-main.js',
    category_main: './src/client/js/category-main.js',
    home_main: './src/client/js/home-main.js',
    product_main: './src/client/js/product-main.js',
    search_main: './src/client/js/search-main.js',
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
    }],
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/chunk-[name].js',
    path: path.resolve(__dirname, 'dist/static'),
  },
};
