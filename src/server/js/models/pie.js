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
const hbs = require('handlebars');
const ingredients = require('../../../../data/ingredients.json');

class Pie {
  constructor(topping) {
    this.DEFAULTS = {
      'topping': Object.keys(ingredients.topping)[0],
      'dough': Object.keys(ingredients.dough)[0],
      'filling': Object.keys(ingredients.filling)[0],
      'decoration': null,
    };
    this._colors = {};
    this._attrs = Object.assign({
      'price': null,
      'weight': null,
      'calories': null,
      'allergens': null,
      'img': null,
    }, this.DEFAULTS);
  }
  set template(svgString) {
    this._template = hbs.compile(svgString);
  }
  set topping(topping) {
    this._attrs.topping = ingredients.topping[topping] ?
      topping : this.DEFAULTS.topping;
    this._colors.topping = ingredients.topping[this._attrs.topping];
    this._colors.toppingDark = this._darken(this._colors.topping);
  }
  set price(price) {
    this._attrs.price = isNaN(price) ? this._attrs.price : price;
  }
  set weight(weight) {
    this._attrs.weight = isNaN(weight) ? this._attrs.weight : weight;
  }
  set calories(calories) {
    this._attrs.calories = isNaN(calories) ? this._attrs.calories : calories;
  }
  set allergens(allergens) {
    this._attrs.allergens = Array.isArray(allergens) ?
      allergens: this._attrs.allergens;
  }
  _darken(sourceColor) {
    return color(sourceColor).darken(0.2).hsl().string();
  }
  svg() {
    return this._template(this._colors);
  }
  json() {
    return Object.assign({
      'signature': this.signature(),
    }, this._attrs);
  }
  signature() {
    return [
      this._attrs.topping || 'x',
      this._attrs.filling || 'x',
      this._attrs.dough || 'x',
      this._attrs.decoration || 'x',
    ].join('-');
  }
}

module.exports = Pie;
