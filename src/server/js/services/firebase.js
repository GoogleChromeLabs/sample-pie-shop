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

import * as admin from 'firebase-admin';
// import keys from '../../../data/keys/devnooktests-firebase-adminsdk-81tr6-ccef77753d';


// const STAGE_ENV = {
//   serviceAccount: keys,
//   databaseURL: 'https://devnooktests.firebaseio.com',
// };

// // TODO: Test for production environment.
// const env = STAGE_ENV;

// admin.initializeApp({
//   credential: admin.credential.cert(env.serviceAccount),
//   databaseURL: env.databaseURL,
//   databaseAuthVariableOverride: {
//     uid: 'my-service-worker',
//   },
// });

const serviceAccount = require('../../../data/keys/pie-shop-app-firebase-adminsdk-cq5dk-ff2e1cd893.json');
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

export default admin;
