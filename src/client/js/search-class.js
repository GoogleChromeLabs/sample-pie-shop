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

const searchInput = document.querySelector('#search input');
const searchSvg = document.querySelector('#search svg');

const MIN_QUERY_LENGTH = 3;

class Search {
  addHandlers() {
    searchInput.onkeyup = (event) => {
      if (event.keyCode === 13) {
        _doSearch();
      }
    };
    searchSvg.onclick = _doSearch;
  }
}

function _doSearch() {
  const query = searchInput.value;
  if (query.length >= MIN_QUERY_LENGTH) {
    document.location.href = `/search/${query}`;
  }
}


export const search = new Search();

