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

// defined in /js/third_party/algoliasearchLite.min.js
/* globals algoliasearch */

import {instance as lazyImg} from './lazy-img.js';

const main = document.querySelector('main');
const h1 = main.querySelector('h1');

const searchInput = document.querySelector('#search input');
const searchSvg = document.querySelector('#search svg');

const MIN_QUERY_LENGTH = 3;

const ALGOLIA_APP_ID = '3S1LH4M84Y';
const ALGOLIA_API_KEY = 'f5efcc2e1026a8a201e66e1902dc7c07'; // search-only key
const ALGOLIA_INDEX_NAME = 'products';

let algoliaIndex;

class Search {
  init() {
    _addHandlers();
    _clearSearchInput();
    _initAlgolia();
  }
  doSearch(query) {
    algoliaIndex.search({
      hitsPerPage: 1000,
      query: query,
    }, _displayResults);
  }
}

function _addHandlers() {
  searchInput.onkeyup = (event) => {
    if (event.keyCode === 13) {
      _openSearchPage();
    }
  };
  searchSvg.onclick = _openSearchPage;
}

function _clearSearchInput() {
  if (!location.href.includes('search')) {
    searchInput.value = '';
  }
}

function _displayResults(error, results) {
  if (error) {
    throw error;
  }
  if (results.nbHits === 0) {
    h1.innerHTML =
    `Sorry! We didn't find any search results for <em>${results.query}</em>.`;
  } else {
    h1.innerHTML =
      `${results.nbHits} search results for <em>${results.query}</em>`;
    for (const hit of results.hits) {
      _displayHit(hit);
    }
    lazyImg.loadImages();
  }
}

function _displayHit(hit) {
  const div = document.createElement('div');

  const a = document.createElement('a');
  a.href = `/${hit.url}`;
  const img = document.createElement('img');
  img.alt = hit.name;
  img.classList.add('lazy');
  img.classList.add('product');
  img.crossorigin = 'anonymous';
  img.dataset.id = hit.id;
  a.appendChild(img);
  div.appendChild(a);

  const h2 = document.createElement('h2');
  h2.textContent = hit.name;
  div.appendChild(h2);

  const p = document.createElement('p');
  p.textContent = hit.price;
  p.classList.add('price');
  div.appendChild(p);

  main.appendChild(div);
}

function _initAlgolia() {
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  algoliaIndex = client.initIndex(ALGOLIA_INDEX_NAME);
}

function _openSearchPage() {
  const query = searchInput.value;
  if (query.length >= MIN_QUERY_LENGTH) {
    document.location.href = `/search/${query}`;
  }
}


export const search = new Search();

