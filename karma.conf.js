/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint max-len: ["off"], no-console: ["off"], require-jsdoc: 0 */
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.dev.js');

module.exports = function(config) {
  const configuration = {
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/client/js/**/*.js',
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,

    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap'],
    },

    webpack: merge(baseWebpackConfig, {
      // The Karma sourcemap loader only works with inline source maps.
      devtool: 'inline-source-map',
    }),

    webpackMiddleware: {
      stats: 'none',
    },
  };

  config.set(configuration);
};
