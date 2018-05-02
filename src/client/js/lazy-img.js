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


const BASE_URL = 'https://res.cloudinary.com/pieshop/f_auto,dpr_auto,q_auto:eco/';

const SIZES = {
  0: 'calc(100vw - 60px)',
  420: 'calc((100vw - 90px) / 2)',
  750: 'calc((100vw - 120px) / 3)',
  1200: 'calc((100vw - 150px) / 4)'
}

const WIDTHS = [500, 1000, 1500];

const options = {
  // rootMargin: top, right, bottom, left margins
  // added to the bounding box of the root element (viewport if not defined)
  // see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
  rootMargin: '0px 0px 100px 0px',
  // threshold: how much of the target visible for the callback to be invoked
  // includes padding, 1.0 means 100%
};

function callback(entries) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const lazyImage = entry.target;
      const id = lazyImage.dataset.id;
      // lazyImage.sizes = getSizes();
      var image = new Image();
      image.src = 'picture.jpg';
      lazyImage.srcset = getSrcset(id);
      io.unobserve(lazyImage);
    }
  }
}

function getSrcset(id) {
  const srcset = [];
  for (const width of WIDTHS) {
    srcset.push(`${BASE_URL}w_${width}/${id}.jpg ${width}w`);
  }
  return srcset.join(',');
}

// function getSizes() {
//   const sizes = [];
//   for (const size in SIZES) { // eslint-disable-line
//     sizes.push(`(min-width: ${size}px) ${SIZES[size]}`);
//   }
//   // return sizes.join(',');

//   // return '(max-width: 420px) calc(100vw - 60px), (min-width: 420px) and (max-width: 750px) calc((100vw - 90px) / 2), (min-width: 750px) and (max - width: 1200px) calc((100vw - 120px) / 3), (min - width: 1200px) calc((100vw - 150px) / 4)';

// }

const images = document.querySelectorAll('img.lazy');

// callback is invoked whenever observe() is called
// including when the page loads
let io;
if (window.IntersectionObserver) {
  io = new IntersectionObserver(callback, options);
}

for (const image of images) {
  if (window.IntersectionObserver) {
    io.observe(image);
  } else {
    console.log('Intersection Observer not supported');
    image.src = BASE_URL + image.getAttribute('data-id' + '.jpg');
  }
}