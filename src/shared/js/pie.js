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

import color from 'color';
import hbs from 'handlebars';
import fs from 'fs';
import ingredients from '../../data/ingredients.json';

const svgPath = `${__dirname}/../views/pie.svg.hbs`;
const template = hbs.compile(fs.readFileSync(svgPath).toString());

const decoPaths = {
  'deco_a': `${__dirname}/../partials/deco_a.svg.hbs`,
  'deco_b': `${__dirname}/../partials/deco_b.svg.hbs`,
  'deco_c': `${__dirname}/../partials/deco_c.svg.hbs`,
};
for (const deco in decoPaths) {
  if (deco.startsWith('deco_')) {
    hbs.registerPartial(deco, fs.readFileSync(decoPaths[deco]).toString());
  }
};

export default class Pie {
  constructor(topping) {
    this.DEFAULTS = {
      'topping': null,
      'dough': null,
      'filling': null,
      'decoration': null,
    };
    this._colors = {
      'topping': '#ccc',
      'dough': '#ddd',
      'filling': '#eee',
    };
    this._colors = Object.assign({
      'toppingDark': this._darken(this._colors.topping),
      'fillingDark': this._darken(this._colors.filling),
      'doughDark': this._darken(this._colors.dough),
    }, this._colors);
    this._attrs = Object.assign({
      'price': null,
      'weight': null,
      'calories': null,
      'allergens': null,
      'img': null,
    }, this.DEFAULTS);
    this._template = template;
  }
  set deco(decoType) {
    this._attrs.deco = decoPaths[decoType] ? decoType : this._attrs.deco;
  }
  get topping() {
    return this._attrs.topping;
  }
  set topping(topping) {
    if (ingredients.topping[topping]) {
      this._attrs.topping = topping;
      this._colors.topping = ingredients.topping[this._attrs.topping];
      this._colors.toppingDark = this._darken(this._colors.topping);
    }
  }
  get filling() {
    return this._attrs.filling;
  }
  set filling(filling) {
    if (ingredients.filling[filling]) {
      this._attrs.filling = filling;
      this._colors.filling = ingredients.filling[this._attrs.filling];
      this._colors.fillingDark = this._darken(this._colors.filling);
    }
  }
  get dough() {
    return this._attrs.dough;
  }
  set dough(dough) {
    if (ingredients.dough[dough]) {
      this._attrs.dough = dough;
      this._colors.dough = ingredients.dough[this._attrs.dough];
      this._colors.doughDark = this._darken(this._colors.dough);
    }
  }
  set price(price) {
    this._attrs.price = isNaN(price) ? this._attrs.price : price;
  }
  set weight(weight) {
    this._attrs.weight = isNaN(weight) ? this._attrs.weight : weight;
  }
  set serves(serves) {
    this._attrs.serves = isNaN(serves) ? this._attrs.serves : serves;
  }
  set calories(calories) {
    this._attrs.calories = isNaN(calories) ? this._attrs.calories : calories;
  }
  set stars(stars) {
    this._attrs.stars = isNaN(stars) ? this._attrs.stars : stars;
  }
  set desc(desc) {
    this._attrs.desc = desc;
  }
  set allergens(allergens) {
    this._attrs.allergens = Array.isArray(allergens) ?
      allergens: this._attrs.allergens;
  }
  _darken(sourceColor) {
    return color(sourceColor).darken(0.2).hex();
  }
  svg() {
    return this._template(Object.assign({
      deco: this._attrs.deco,
    }, this._colors));
  }
  json() {
    return Object.assign({
      'signature': this.signature(),
      'title': this.title,
    }, this._attrs);
  }
  get title() {
    let title = `A ${this._attrs.filling} pie`;
    if (this._attrs.topping) {
      title = `${title} with ${this._attrs.topping}`;
    }
    return title;
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
