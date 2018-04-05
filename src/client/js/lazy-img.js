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

const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      lazyImageObserver.unobserve(entry.target);
    }
  });
});

const backupSvg = ("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 188.929889298893 256' clip-path='url(#clip)' width='200' height='271'><defs><clipPath id='clip' clipPathUnits='objectBoundingBox'><rect x='0' y='0' width='188.929889298893' height='256'/></clipPath></defs><rect x='0' y='0' width='188.929889298893' height='256' fill='rgb(204, 201, 198)'/><path d='M183,195L44,157L200,176Z' fill='rgb(25, 25, 26)' fill-opacity='0.59'/><path d='M49,120L150,46L86,187Z' fill='rgb(77, 71, 67)' fill-opacity='0.66'/><path d='M59,171L-197,175L68,245Z' fill='rgb(36, 31, 24)' fill-opacity='0.84'/><path d='M107,115L144,76L130,52Z' fill='rgb(0, 3, 6)' fill-opacity='0.56'/><path d='M-11,157L33,158L-24,135Z' fill='rgb(53, 47, 40)' fill-opacity='0.55'/><path d='M63,196L128,228L110,183Z' fill='rgb(101, 83, 66)' fill-opacity='0.46'/><path d='M260,-2L177,147L113,0Z' fill='rgb(249, 250, 251)' fill-opacity='0.75'/><path d='M-168,53L288,-92L63,99Z' fill='rgb(239, 240, 240)' fill-opacity='0.88'/><path d='M89,213L126,206L123,222Z' fill='rgb(73, 62, 52)' fill-opacity='0.51'/><path d='M58,205L109,249L61,243Z' fill='rgb(116, 105, 94)' fill-opacity='0.75'/><path d='M43,247L56,330L-11,242Z' fill='rgb(110, 90, 73)' fill-opacity='0.44'/><path d='M105,180L150,181L272,369Z' fill='rgb(236, 237, 237)' fill-opacity='0.91'/><path d='M155,75L97,123L200,186Z' fill='rgb(239, 240, 241)' fill-opacity='0.74'/><path d='M-9,90L74,191L-3,168Z' fill='rgb(136, 126, 117)' fill-opacity='0.52'/><path d='M98,236L208,180L191,262Z' fill='rgb(248, 247, 247)' fill-opacity='0.67'/><path d='M98,186L98,201L63,180Z' fill='rgb(129, 116, 104)' fill-opacity='0.72'/><path d='M116,125L100,164L171,171Z' fill='rgb(245, 246, 249)' fill-opacity='0.54'/><path d='M105,156L49,134L64,169Z' fill='rgb(72, 61, 51)' fill-opacity='0.41'/><path d='M110,181L72,170L155,174Z' fill='rgb(73, 72, 71)' fill-opacity='0.55'/><path d='M98,108L98,92L118,94Z' fill='rgb(241, 244, 246)' fill-opacity='0.62'/></svg>");

class LazyImg extends HTMLElement {
  constructor() {
    super();
    this.img = document.createElement('img');
    this.img.src = `data:image/svg+xml;utf8,${backupSvg}`;
    this.img.dataset.src = this.getAttribute('src');
    this.setAttribute('style', 'display:block;');
    this.appendChild(this.img);
  }

  connectedCallback() {
    lazyImageObserver.observe(this.img);
  }

  disconnectedCallback() {
    lazyImageObserver.unobserve(this.img);
  }
}

window.customElements.define('lazy-img', LazyImg);