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

const BREAKPOINTS = [0, 420, 750, 1200];
const DISPLAY_WIDTHS = ['calc(100vw - 60px)', 'calc((100vw - 90px) / 2)',
  'calc((100vw - 120px) / 3)', 'calc((100vw - 150px) / 4)'];

const IMAGE_WIDTHS = [500, 1000, 1500];

export function getSrcset(id) {
  const srcset = [];
  for (const width of IMAGE_WIDTHS) {
    srcset.push(`${BASE_URL}w_${width}/${id}.png ${width}w`);
  }
  return srcset.join(',');
};

export function getSizes() {
  const sizes = [];
  for (let i = 0; i !== BREAKPOINTS.length; ++i) {
    let size = `(min-width: ${BREAKPOINTS[i]}px) `;
    const nextBreakpoint = BREAKPOINTS[i + 1];
    if (nextBreakpoint) {
      size += `and (max-width: ${nextBreakpoint}px) `;
    }
    size += DISPLAY_WIDTHS[i];
    sizes.push(size);
  }
  return sizes.join(',');

  //  return '(max-width: 419px) calc(100vw - 60px), (min-width: 420px) and
  // (max-width: 750px) calc((100vw - 90px) / 2), (min-width: 750 px) and
  // (max - width: 1200 px) calc((100 vw - 120 px) / 3),
  // (min - width: 1200 px) calc((100 vw - 150 px) / 4)';
};
