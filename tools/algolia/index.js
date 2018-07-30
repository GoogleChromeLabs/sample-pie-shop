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
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');

const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');

// load values from the .env file in this directory into process.env
dotenv.load();

const DEFAULT_CONFIG_FILE = path.resolve(__dirname, '../data/firebase-admin-key.json');
const DATABASE_URL = 'https://pie-shop-app.firebaseio.com';

function initializeApp() {
  // Check if app has already been initialized
  if (admin.apps.length === 0) {
    let credential = null;
    const DEFAULT_CONFIG_FILE = path.resolve(__dirname, '../data/firebase-admin-key.json');
    const DATABASE_URL = 'https://pie-shop-app.firebaseio.com';

    if (process.env.FB_KEYS) {
      // Try the environment variable first
      credential = admin.credential.cert(require(process.env.FB_KEYS));
    } else if (fs.existsSync(DEFAULT_CONFIG_FILE)) {
      // Check the default config file second
      credential = admin.credential.cert(require(DEFAULT_CONFIG_FILE));
    } else {
      // Finally check if we can get credentials from a Cloud environment
      credential = admin.credential.applicationDefault();
    }

    admin.initializeApp({
      credential: credential,
      databaseURL: DATABASE_URL,
    });
  }
}

initializeApp();

const database = admin.database();

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);
console.log('index', index);

// Get all products from Firebase
function importProducts() {
  database.ref('/').once('value', products => {
    // Build an array of all records to push to Algolia
    const records = [];
    products.forEach(product => {
      // get the key and data from the snapshot
      const childKey = product.key;
      const childData = product.val();
      // We set the Algolia objectID as the Firebase .key
      childData.objectID = childKey;
      // Add object for indexing
      records.push(childData);
    });

    // Add or update new objects
    index
      .saveObjects(records)
      .then(() => {
        console.log('products imported into Algolia');
      })
      .catch(error => {
        console.error('Error when importing product into Algolia', error);
        process.exit(1);
      });
  });
}

const contactsRef = database.ref('/');
contactsRef.on('child_added', addOrUpdateIndexRecord);
contactsRef.on('child_changed', addOrUpdateIndexRecord);
contactsRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(contact) {
  // Get Firebase object
  const record = contact.val();
  // Specify Algolia's objectID using the Firebase object key
  record.objectID = contact.key;
  // Add or update object
  index
    .saveObject(record)
    .then(() => {
      console.log('Firebase object indexed in Algolia', record.objectID);
    })
    .catch(error => {
      console.error('Error when indexing contact into Algolia', error);
      process.exit(1);
    });
}

function deleteIndexRecord(contact) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = contact.key;
  // Remove the object from Algolia
  index
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting contact from Algolia', error);
      process.exit(1);
    });
}
