/**
 *
 *  Online store PWA sample.
 *  Copyright 2017 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');

const del = require('del');
const http = require('http');

const srcDir = './src';
const clientDir = `${srcDir}/client`;
const serverDir = `${srcDir}/server`;
const sharedDir = `${srcDir}/shared`;
const viewDir = `${sharedDir}/views`;
const distDir = './dist';

gulp.task('clean', () => del([distDir]));

gulp.task('eslint', () => gulp.src(`${srcDir}/**/*.js`)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
);

gulp.task('images', () => gulp.src(`${clientDir}/images/**/*`, {base: srcDir})
  .pipe(gulp.dest(distDir))
);

gulp.task('sass', () => gulp.src(`${clientDir}/styles/**/*.scss`, {base: srcDir})
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(distDir))
);

gulp.task('clientjs', () => gulp.src(`${clientDir}/js/**/*.js`, {base: srcDir})
  .pipe(gulp.dest(distDir))
);

gulp.task('serverjs', () => gulp.src(`${serverDir}/js/**/*.js`, {base: srcDir})
  .pipe(gulp.dest(distDir))
);

gulp.task('sharedjs', () => gulp.src(`${sharedDir}/js/**/*.js`, {base: srcDir})
  .pipe(gulp.dest(distDir))
);

gulp.task('views', () => gulp.src(`${viewDir}/**/*`, {base: srcDir})
  .pipe(gulp.dest(distDir))
);

gulp.task('build', ['eslint', 'clientjs', 'serverjs', 'sass', 'images', 'views']);

gulp.task('serve', ['build'], () => {
  const app = require('./dist/server/js/app');
  const debug = require('debug')('pieshop:server');

  // Get port from environment and store in Express.
  // TODO: H2 + TLS.
  const port = parseInt(process.env.PORT, 10) || 3000;
  app.set('port', port);

  // Create HTTP server.
  const server = http.createServer(app);

  // Listen on provided port, on all network interfaces.
  server.listen(port);
  server.on('listening', () => {
    const addr = server.address();
    debug(`Listening on port ${addr.port}`);
  });
  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    // Handle specific listen errors with friendly messages.
    switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
    }
  });
});
