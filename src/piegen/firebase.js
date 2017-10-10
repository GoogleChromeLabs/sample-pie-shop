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

const admin = require('firebase-admin');
const flags = require('flags');
const series = require('promise-map-series');
const generatePie = require('./piegen.js');

flags.defineBoolean('prod');
flags.defineNumber('pies', 10);
flags.parse();

const STAGE_ENV = {
  serviceAccount: require('../../keys/devnooktests-firebase-adminsdk-81tr6-ccef77753d'),
  databaseURL: 'https://devnooktests.firebaseio.com',
};

let env = {};

if (flags.get('prod')) {
  // TODO: Set up production environment.
  console.log('Production environment not set up.');
} else {
  env = STAGE_ENV;
}

admin.initializeApp({
  credential: admin.credential.cert(env.serviceAccount),
  databaseURL: env.databaseURL,
  databaseAuthVariableOverride: {
    uid: 'my-service-worker',
  },
});

const db = admin.database();
const products = db.ref('/products');

const pies = [];
for (let i = 0; i < flags.get('pies'), i++) {
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
