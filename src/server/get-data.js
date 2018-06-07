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

const fei = require('firestore-export-import');
fei.initializeApp(process.env.FB_KEYS,
  'https://firebase.corp.google.com/u/0/project/pie-shop-app/');

let homeData;
let productData;

export function getHomeData() {
  if (homeData) {
    return homeData;
  } else {
    fei.backup('home').then((data) => {
      homeData = {
        categories: data.home.categories.data,
        products: data.home.products.data,
      };
      return homeData;
    });
  }
}

export function getProducts(category) {
  if (productData) {
    return filterCategory(productData, category);
  } else {
    fei.backup('products').then((data) => {
      productData = data.products.data.items;
      return filterCategory(productData, category);
    });
  }
}

function filterCategory(products, category) {
  return products.filter((product) => {
    return product.category === category;
  });
}

export function getProduct(productUrl) {
  if (productData) {
    return findUrl(productData, productUrl);
  } else {
    fei.backup('products').then((data) => {
      productData = data.products.data.items;
      return findUrl(productData, productUrl);
    });
  }
}

function findUrl(products, productUrl) {
  return products.find((product) => {
    return product.url === productUrl;
  });
}


