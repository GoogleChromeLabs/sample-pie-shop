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

const PIE_ATTRIBUTES = ['dough', 'filling', 'topping', 'deco'];

export default class PieImg extends HTMLElement {
  static get observedAttributes() {
    return PIE_ATTRIBUTES;
  }

  constructor() {
    super();
    this.style.width = this.getAttribute('width');
    this.style.height = this.getAttribute('height');
    this.style.display = 'inline-block';
    this.style.background = `url(${this._getSvgUrl()}) no-repeat center/cover`;
  }

  _getSvgUrl() {
    const topping = this.getAttribute('topping');
    const dough = this.getAttribute('dough');
    const filling = this.getAttribute('filling');
    return `/pieimg/pie-svg?topping=${topping}&filling=${filling}&dough=${dough}&deco=${deco}`;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (PIE_ATTRIBUTES.includes(name)) {
      this.style.background = `url(${this._getSvgUrl()}) no-repeat center/cover`;
    }
  }
}
window.customElements.define('pie-img', PieImg);
