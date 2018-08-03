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
const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// load values from the .env file in this directory into process.env
dotenv.load();

function initializeApp() {
  // Check if app has already been initialized
  if (admin.apps.length === 0) {
    let credential = null;
    const defaultConfigFile = path.resolve(__dirname,
      '../data/firebase-admin-key.json');
    const databaseURL = 'https://pie-shop-app.firebaseio.com';

    if (process.env.FB_KEYS) {
      // Try the environment variable first
      credential = admin.credential.cert(require(process.env.FB_KEYS));
    } else if (fs.existsSync(defaultConfigFile)) {
      // Check the default config file second
      credential = admin.credential.cert(require(defaultConfigFile));
    } else {
      // Finally check if we can get credentials from a Cloud environment
      credential = admin.credential.applicationDefault();
    }

    admin.initializeApp({
      credential: credential,
      databaseURL: databaseURL,
    });
  }
}

initializeApp();

const database = admin.database();

// Configure Algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

// Get all items from Firebase
function importItems() { // eslint-disable-line no-unused-vars
  database.ref('/').once('value', (items) => {
    // Build an array of all records to push to Algolia
    const records = [];
    items.forEach((item) => {
      // Get the key and data from the snapshot
      const childKey = item.key;
      const childData = item.val();
      // Set the Algolia objectID as the Firebase .key
      childData.objectID = childKey;
      // Add object for indexing
      records.push(childData);
    });

    // Add or update new objects
    index
      .saveObjects(records)
      .then(() => {
        console.log(`Imported ${records.length} records to Algolia`);
      })
      .catch((error) => {
        console.error('Error importing to Algolia', error);
        process.exit(1);
      });
  });
}

const databaseRef = database.ref('/');
databaseRef.on('child_added', addOrUpdateIndexRecord);
databaseRef.on('child_changed', addOrUpdateIndexRecord);
databaseRef.on('child_removed', deleteIndexRecord);

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
    .catch((error) => {
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
    .catch((error) => {
      console.error('Error when deleting object from Algolia', error);
      process.exit(1);
    });
}
