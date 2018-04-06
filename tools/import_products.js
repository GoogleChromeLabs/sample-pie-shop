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

import parse from 'csv-parse';
import path from 'path';
import fs from 'fs';
import admin from '../src/services/firebase.js';
import { signaturize, getNWords } from '../src/shared/js/stringUtils';

const DATA_FILE = '../products.csv';
const CATEGORIES_FILE = '../src/data/categories.json';

const COLUMNS = {
  storeId: 0,
  title: 1,
  shortDesc: 2,
  price: 7,
  longDesc: 9,
  inStock: 19,
  weight: 20,
  weightUnit: 21,
  length: 22,
  width:23,
  height: 24,
  sizeUnit: 25,
  imageLarge: 32,
  imageMedium: 37,
  imageThumb: 42,
  imageSmall: 47,
  category: 56,
}

const categories = new Set();

const parseProductLine = (record) => {
  let product = {};
  Object.keys(COLUMNS).forEach((column) => {
    product[column] = record[COLUMNS[column]].trim();
  });
  product.signature = signaturize(getNWords(product.title, 7));
  categories.add(product.category);
  return product;
}

const updateCategories = () => {
  return fs.writeFileSync(path.join(__dirname, CATEGORIES_FILE),
      JSON.stringify(Array.from(categories)));
}

const clearCollection = (collection, batchSize) => {
  const query = collection.orderBy('__name__').limit(batchSize);
  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
};

const deleteQueryBatch = (db, query, batchSize, resolve, reject) => {
  query.get().then((snapshot) => {
    if (snapshot.size === 0) {
        return 0;
    }
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    return batch.commit().then(() => {
        return snapshot.size;
    });
  }).then((numDeleted) => {
    if (numDeleted === 0) {
      resolve();
      return;
    }
    process.nextTick(() => {
      deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
  })
  .catch(reject);
};

const processRecord = (record) => productsRef.add(parseProductLine(record));

const db = admin.firestore();
const productsRef = db.collection('products');
clearCollection(productsRef, 100).then(() => {
  fs.readFile(path.join(__dirname, DATA_FILE), (err, input) => {
    return parse(input, {}, function(err, output) {
      console.log(`Uploading ${output.length} products...`);
      return Promise.all(output.map(processRecord))
        .then((results) => {
          console.log(results);
        })
        .then(updateCategories)
        .then(process.exit);
    });
  });
});
