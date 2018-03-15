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

import admin from '../../src/services/firebase.js';
import fetch from 'node-fetch';
import { URL, URLSearchParams } from 'url';
import categories from '../../src/data/categories';
import { signaturize, getNWords } from '../../src/shared/js/stringUtils';

const API_CLIENT_ID = 'ceced05f3befb37ab80604cdffe1860d74e080c6fe40455c659bbed071c0ab58';
const IMG_ORIENTATION = 'portrait';
const IMG_WIDTH = 100;
const MIN_PRICE = 60;
const MAX_PRICE = 430;
const FRAMES = ['black', 'white', 'none'];
const FILTERS = ['grayscale', 'sepia', 'hue-violet','none'];

const random = (min, max) => (
  Math.max(min, Math.round((min + Math.random() * (max - min))))
);

const baseApiUrl= new URL('https://api.unsplash.com/photos/random');
baseApiUrl.searchParams.append('client_id', API_CLIENT_ID);
baseApiUrl.searchParams.append('orientation', IMG_ORIENTATION);
baseApiUrl.searchParams.append('count', '30');
baseApiUrl.searchParams.append('w', IMG_WIDTH);

const makeProducts = (photos, category) => (photos.reduce((result, photo) => {
  if (photo.description) {
    const product = {
      id: photo.id,
      description: photo.description,
      color: photo.color,
      urls: photo.urls,
      likes: photo.likes,
      category: category,
    };
    let i = 0;
    FILTERS.forEach(filter => {
      FRAMES.forEach(frame => {
        result.products.push(Object.assign({
          filter: filter,
          frame: frame,
          price: random(MIN_PRICE, MAX_PRICE),
          signature: `${signaturize(getNWords(photo.description, 5))}-${photo.id}-${i}`,
        }, product));
      })
    });
  } else {
    result.noDescCount += 1;
  }
  return result;
}, { products: [], noDescCount: 0}));

async function getProducts() {
  return Promise.all(categories.map(async (category) => {
    const apiUrl = new URL(baseApiUrl.href);
    apiUrl.searchParams.append('query', category);
    console.info(`Fetching results for ${category}...`);
    let response = await fetch(apiUrl);
    let photosJson = await response.json();
    let { products, noDescCount } = makeProducts(photosJson, category);
    console.info(`Omitting ${noDescCount} photos missing description.`);
    return products;
  })).then(result => [].concat.apply([], result));
}

const db = admin.database();
const productsRef = db.ref('/products');
productsRef.remove();

getProducts().then(products => {
  Promise.all(products.map(newProduct => {
    return productsRef
      .orderByChild('signature')
      .equalTo(newProduct.signature)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          console.log(`Product ${signature} already exists`);
          return true;
        } else {
          return productsRef.push(newProduct);
        }
      });
  })).then(result => {
    console.info(`Uploaded ${result.length} products`);
    process.exit();
  });
});
