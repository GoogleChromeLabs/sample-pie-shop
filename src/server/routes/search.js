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

import categories from '../../data/categories';
import {algolia} from '../../services/algolia';

const search = {
  get: (req, res, next) => {
    algolia.init();
    _doSearch(req, res);
  },
};

function _doSearch(req, res) {
  algolia.search(req.params.query, function(error, results) {
    if (error) {
      throw error;
    }
    _displayResults(req, res, results);
  });
}

function _displayResults(req, res, results) {
  res.render('search', {
    cart: req.session.cart,
    categories: categories,
    layout: req.query.fragment ? 'fragment' : 'layout',
    query: req.params.query,
    scripts: [
      '/js/search_main.js',
    ],
    results: results,
    title: `PWA Shop: Search '${req.params.query}'`,
  });
}

export default search;
