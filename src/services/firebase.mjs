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
import fs from 'fs';

export default function initializeApp() {
  // Check if app has already been initialized
  if (admin.apps.length === 0) {
    const credential = null;
    const DEFAULT_CONFIG_FILE = '../data/firebase-admin-key.json';
    const DATABASE_URL = 'https://pie-shop-app.firebaseio.com';

    if (process.env.FB_KEYS) {
      // Try the environment variable first
      admin.initializeApp(process.env.FB_KEYS, DATABASE_URL);
    } else if (fs.existsSync(DEFAULT_CONFIG_FILE)) {
      // Check the default config file second
      admin.initializeApp(require(DEFAULT_CONFIG_FILE), DATABASE_URL);
    } else {
      admin.initializeApp();
    }

    admin.initializeApp({
      credential: credential,
      databaseURL: DATABASE_URL,
    });
  }
}
