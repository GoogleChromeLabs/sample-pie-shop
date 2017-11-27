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
 (function() {

  const template = document.createElement('template');
  template.innerHTML = `
    <pie-img width="300px" height="200px"></pie-img>
    <div>
      <h1 class="pie-title skeleton skeleton-on"></h1>
      <div class="pie-description skeleton-text skeleton-on">
        <p></p>
        <ul>
          <li><span class="pie-weight"></span></li>
          <li><span class="pie-price"></span></li>
        </ul>
      </div>
    </div>`;

  class PieItem extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      let content = template.content.cloneNode(true);
      this.appendChild(content);
      this._connected = true;
      if (this._pie) {
        this._populate();
      }
    }
    _populate() {
      this.querySelector('.skeleton').classList.remove('skeleton-on');
      this.querySelector('.skeleton-text').classList.remove('skeleton-on');
      this.querySelector('.pie-title').innerHTML = this._pie.signature;
      this.querySelector('.pie-weight').innerHTML = `weight: ${this._pie.weight}`;
      this.querySelector('.pie-price').innerHTML = `price: ${this._pie.price}`;
      this.querySelector('pie-img').setAttribute('topping', this._pie.topping);
      this.querySelector('pie-img').setAttribute('filling', this._pie.filling);
      this.querySelector('pie-img').setAttribute('dough', this._pie.dough);
    }
    set pie(pie) {
      this._pie = pie;
      if (this._connected) {
        this._populate();
      }
    }
  }
  window.customElements.define('pie-item', PieItem);
})();
