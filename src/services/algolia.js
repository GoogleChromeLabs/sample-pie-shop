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

const algoliasearch = require('algoliasearch');

const APP_ID = '3S1LH4M84Y';
const API_KEY = 'f5efcc2e1026a8a201e66e1902dc7c07'; // search-only key
const INDEX_NAME = 'products';
const HITS_PER_PAGE = 1000;

let isInitiated;

let algoliaIndex;

class Algolia {
  init() {
    if (!isInitiated) {
      const client = algoliasearch(APP_ID, API_KEY);
      algoliaIndex = client.initIndex(INDEX_NAME);
      isInitiated = true;
    }
  }
  search(query, callback) {
    algoliaIndex.search({
      hitsPerPage: HITS_PER_PAGE,
      query: query,
    }, callback);
  }
}

export const algolia = new Algolia();
