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
const Pie = require('./pie.js');
const ingredients = require('../../data/ingredients.json');

function getRandomKey(obj) {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getRandomNumber(min, max) {
  return Math.max(min, Math.round((Math.random() * max)));
}

const MIN_WEIGHT = 300; // In grams.
const MAX_WEIGHT = 1000; // In grams.
const MAX_PRICE = 800;
const MIN_CALORIES = 200; // For 100 grams.
const MAX_CALORIES = 800; // For 100 grams.
const ALLERGEN_FREQUENCY = 0.7; // How often allergens are present.

function generatePie() {
  const pie = new Pie();
  pie.topping = getRandomKey(ingredients.topping);
  pie.price = getRandomNumber(0, MAX_PRICE);
  pie.weight = getRandomNumber(MIN_WEIGHT, MAX_WEIGHT);
  pie.calories = getRandomNumber(MIN_CALORIES, MAX_CALORIES);
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
