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

/* globals algoliasearch */

const searchInput = document.querySelector('#search input');
const searchSvg = document.querySelector('#search svg');

const MIN_QUERY_LENGTH = 3;

// TODO: these values are not secret, but probably don't belong here.
const ALGOLIA_APP_ID = '3S1LH4M84Y';
// search-only API key
const ALGOLIA_API_KEY = 'f5efcc2e1026a8a201e66e1902dc7c07';
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
      query: query,
    }, _handleSearchResults);
  }
}

function _addHandlers() {
  searchInput.onkeyup = (event) => {
    if (event.keyCode === 13) {
      openSearchPage();
    }
  };
  searchSvg.onclick = openSearchPage;

  function openSearchPage() {
    const query = searchInput.value;
    if (query.length >= MIN_QUERY_LENGTH) {
      document.location.href = `/search/${query}`;
    }
  }
}

function _clearSearchInput() {
  const searchInput = document.querySelector('#search input');
  if (!location.href.includes('search')) {
    searchInput.value = '';
  }
}

function _handleSearchResults(error, results) {
  if (error) {
    throw error;
  }
  console.log(results.hits);
}


function _initAlgolia() {
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  algoliaIndex = client.initIndex(ALGOLIA_INDEX_NAME);
}

export const search = new Search();

