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

import express from 'express';
import path from 'path';
// Uncomment after placing your favicon in /public.
// import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import index from './routes/index';
import search from './routes/search';
import category from './routes/category';
import listing from './routes/listing';
import product from './routes/product';

const app = express();
const appRoot = path.join(__dirname, '..', '..');

// View engine setup.
app.set('views', path.join(appRoot, 'shared', 'views'));
app.set('view engine', 'hbs');

// Uncomment after placing your favicon in /public.
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(appRoot, 'client')));

app.use('/search', search);
app.use('/category', category);
app.use('/listing', listing);
app.use('/product', product);
app.use('/', index);

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

  // Render the error page.
  res.status(err.status || 500);
  res.render('error');
});

export default app;
