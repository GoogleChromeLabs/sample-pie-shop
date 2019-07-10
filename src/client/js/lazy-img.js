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

import {getSrcset, getSizes, BASE_URL} from '../../common/images.js';

const options = {
  // rootMargin: top, right, bottom, left margins
  // added to the bounding box of the root element (viewport if not defined)
  // see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
  rootMargin: '0px 0px 100px 0px',
  // threshold: how much of the target visible for the callback to be invoked
  // includes padding, 1.0 means 100%
};

class LazyImg {
  constructor() {
    if (window.IntersectionObserver) {
      this._io = new IntersectionObserver(this._loadImages.bind(this), options);
    }
  }

  _setSrcSet(image) {
    const id = image.dataset.id;
    image.srcset = getSrcset(id);
  }

  _loadImages(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const image = entry.target;
        this._setSrcSet(image);
        this._io.unobserve(image);
      }
    }
  }

  loadImages() {
    const images = document.querySelectorAll('img.lazy');
    for (const image of images) {
      image.sizes = getSizes();
      if (this._io) {
        this._io.observe(image); // adds srcset when img element is in view
      } else {
        this._setSrcSet(image);
        image.src = BASE_URL + 'id' + '.jpg';
      }
      image.classList.remove('lazy');
    }
  }
}

const instance = new LazyImg();
export {LazyImg, instance};
