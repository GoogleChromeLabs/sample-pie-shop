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

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import hbs from 'express-handlebars';
import logger from 'morgan';
import path from 'path';
import session from 'express-session';

import router from './router';

import {getHomeData, getProducts} from './get-data';
import categories from '../data/categories';

const app = express();
const rootDir = path.join(__dirname, '..');
const staticDir = path.join(rootDir, 'static');

getHomeData();
getProducts();

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(rootDir, 'templates', 'layouts'),
  partialsDir: path.join(rootDir, 'templates', 'partials'),
  helpers: {
    multiplyAndFormat: (a, b) => (a * b).toFixed(2),
  },
}));
app.set('views', path.join(rootDir, 'templates', 'views'));
app.set('view engine', 'hbs');

app.use(session({
  // WARNING: This is a code sample. Please use a real store for your sessions
  // instead of memcache in a production code.
  secret: 'some secret',
  maxAge: 60 * 1000, // 60 sec
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(staticDir));

app.use(router);

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler.
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error('Error in app.js:', err);
  // Render the error page.
  res.status(err.status || 500);
  res.render('error', {
    categories: categories,
  });
});

export default app;
