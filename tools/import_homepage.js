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

const firestoreService = require('firestore-export-import');

firestoreService.initializeApp(process.env.FB_KEYS,
  'https://firebase.corp.google.com/u/0/project/pie-shop-app/');

firestoreService.restore('../src/data/home.json');

// import admin from '../src/services/firebase.js';
// import home from '../src/data/home.json';

// const clearCollection = (collection, batchSize) => {
//   const query = collection.orderBy('__name__').limit(batchSize);
//   return new Promise((resolve, reject) => {
//     deleteQueryBatch(db, query, batchSize, resolve, reject);
//   });
// };

// const deleteQueryBatch = (db, query, batchSize, resolve, reject) => {
//   query.get().then((snapshot) => {
//     if (snapshot.size === 0) {
//       return 0;
//     }
//     const batch = db.batch();
//     snapshot.docs.forEach((doc) => {
//       batch.delete(doc.ref);
//     });
//     return batch.commit().then(() => {
//       return snapshot.size;
//     });
//   }).then((numDeleted) => {
//     if (numDeleted === 0) {
//       resolve();
//       return;
//     }
//     process.nextTick(() => {
//       deleteQueryBatch(db, query, batchSize, resolve, reject);
//     });
//   })
//     .catch(reject);
// };

// const db = admin.firestore();
// const productsRef = db.collection('home');
// clearCollection(productsRef, 100).then(() => {
//   db.collection('home').set(home);
// });
