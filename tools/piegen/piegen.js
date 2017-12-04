// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import Pie from '../../src/shared/js/pie.js';
import ingredients from '../../src/data/ingredients.json';

function getRandomKey(obj) {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getRandomNumber(min, max) {
  return Math.max(min, Math.round((Math.random() * max)));
}

const ADJECTIVES = [
  'mouth-watering',
  'delicious',
  'tasty',
  'crafty',
  'well-done'
];

const NOUNS = [
  'combination',
  'pie',
  'composition'
];

const VERBS = [
  'handcrafted from',
  'filled with',
  'served with'
]

function generateDescription(pie) {
  const adjIndex = getRandomNumber(0, ADJECTIVES.length - 1);
  const adj1 = ADJECTIVES[adjIndex];
  const adj2 = ADJECTIVES[(adjIndex+1)%ADJECTIVES.length];
  const adj3 = ADJECTIVES[(adjIndex+2)%ADJECTIVES.length];
  const noun = NOUNS[getRandomNumber(0, NOUNS.length - 1)];
  const verb = VERBS[getRandomNumber(0, VERBS.length - 1)];
  const filling = pie.filling;
  const dough = pie.dough;
  return `A ${adj1} and ${adj2} ${noun}, ${verb} ${filling} and wrapped in a ${adj3} ${dough}`;
}

const MAX_STARS = 5;
const MIN_PRICE = 15;
const MAX_PRICE = 60;
const MIN_CALORIES = 200; // For 100 grams.
const MAX_CALORIES = 600; // For 100 grams.
const ALLERGEN_FREQUENCY = 0.7; // How often allergens are present.

const SIZES = {
  big: {
    minWeight: 600,
    maxWeight: 900,
    serves: 6
  },
  medium: {
    minWeight: 400,
    maxWeight: 600,
    serves: 4
  },
  small: {
    minWeight: 250,
    maxWeight: 400,
    serves: 2
  }
}

function generatePie() {
  const pie = new Pie();
  pie.topping = getRandomKey(ingredients.topping);
  pie.filling = getRandomKey(ingredients.filling);
  pie.dough = getRandomKey(ingredients.dough);
  pie.price = getRandomNumber(MIN_PRICE, MAX_PRICE);
  const size = getRandomKey(SIZES);
  pie.weight = getRandomNumber(SIZES[size].minWeight, SIZES[size].maxWeight);
  pie.serves = SIZES[size].serves;
  pie.calories = getRandomNumber(MIN_CALORIES, MAX_CALORIES);
  pie.stars = getRandomNumber(0, MAX_STARS);
  pie.desc = generateDescription(pie);
  if (Math.random() < ALLERGEN_FREQUENCY) {
    const allergens = new Set();
    const allergensLength = Object.keys(ingredients.allergens).length;
    for (let i = 0; i < allergensLength; i++) {
      allergens.add(getRandomKey(ingredients.allergens));
    }
    pie.allergens = Array.from(allergens);
  }
  return pie;
};

module.exports = generatePie;
