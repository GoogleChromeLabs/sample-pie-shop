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

import admin from 'firebase-admin';

let configFile = path.resolve(__dirname, '../data/firebase-admin-key.json');

if (process.env.FB_KEYS) {
  configFile = process.env.FB_KEYS;
}

if (admin.initializeApp) {
  admin.initializeApp({
    credential: admin.credential.cert(require(configFile)),
    databaseURL: 'https://pie-shop-app.firebaseio.com',
    databaseAuthVariableOverride: {
      uid: 'my-service-worker',
    },
  });
}

export default admin;
