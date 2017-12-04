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

import path from 'path';
import admin from 'firebase-admin';
import flags from 'flags';
import keys from '../../../data/keys/devnooktests-firebase-adminsdk-81tr6-ccef77753d';

flags.defineBoolean('prod');
flags.parse();

const STAGE_ENV = {
  serviceAccount: keys,
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

export default admin;
