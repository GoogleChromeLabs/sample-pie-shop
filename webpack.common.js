const path = require('path');

const BROWSERS = [
  'last 2 chrome versions',
  'last 2 safari versions',
  'last 2 firefox versions',
  'last 2 edge versions',
];

module.exports = {
  entry: {
    'index-bundle': './src/client/js/index-main.js',
    'listing-bundle': './src/client/js/listing-main.js',
    'product-bundle': './src/client/js/product-main.js',
    'search-bundle': './src/client/js/search-main.js',
    'category-bundle': './src/client/js/category-main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {
              targets: {
                browsers: BROWSERS,
              },
              modules: false,
            }]],
            plugins: ['syntax-dynamic-import'],
            babelrc: false,
          },
        },
      },
    ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'chunk-[name].js',
    path: path.resolve(__dirname, 'dist/static/js'),
  },
};
