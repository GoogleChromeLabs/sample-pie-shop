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

const color = require('color');
const jsdom = require('jsdom');
const ingredients = require('../../../../data/ingredients.json');

const {JSDOM} = jsdom;

class Pie {
  constructor(topping) {
    this.DEFAULT_TOPPING = 'icing';
  }
  set template(svgString) {
    this._svg = new JSDOM(svgString);
  }
  set topping(topping) {
    this._topping = ingredients.topping[topping] ?
      topping : this.DEFAULT_TOPPING;
    this._toppingColor = ingredients.topping[this._topping];
    this._svg.window.document.querySelector(
      '#topping').setAttribute('fill', this._toppingColor);
    this._svg.window.document.querySelector(
      '#topping-dark').setAttribute('fill', this._darken(this._toppingColor));
  }
  _darken(sourceColor) {
    return color(sourceColor).darken(0.2).hsl().string();
  }
  toSvg() {
    return this._svg.window.document.body.innerHTML;
  }
}

module.exports = Pie;
