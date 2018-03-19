const path = require('path');

const BROWSERS = [
  'last 2 chrome versions',
  'last 2 safari versions',
  'last 2 firefox versions',
  'last 2 edge versions',
];

module.exports = {
  entry: {
    main: './src/client/js/app.js',
    listing_main: './src/client/js/listing-main.js',
    index_main: './src/client/js/index-main.js',
    category_main: './src/client/js/category-main.js',
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
