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

import admin from '../../src/server/js/services/firebase.js';

import series from 'promise-map-series';
import generatePie from './piegen.js';

const db = admin.database();
const products = db.ref('/products');

const pies = [];
for (let i = 0; i < 100; i++) {
  pies.push(generatePie());
}

series(pies, function(pie) {
  const signature = pie.signature();
  return new Promise((resolve, reject) => {
    products.orderByChild('signature').equalTo(signature).once(
      'value').then(function(snapshot) {
      if (snapshot.val()) {
        console.log(`Product ${signature} already exists`);
        resolve();
      } else {
        products.push(pie.json()).then((_) => {
          console.log(`Added product ${signature}`);
          resolve();
        });
      }
    }, reject);
  });
}).then(process.exit);
