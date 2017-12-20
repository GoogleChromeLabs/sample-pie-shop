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
import generatePie from './piegen.js';

const products = admin.firestore().collection('/products');
const NUM_PIES = 100;
let piesGenerated = 0;

console.log('Pies to generate:', NUM_PIES);

const checkPie = async (pieRef) => {
  return await pieRef.get();
}

const persistPie = async (pieRef, data) => {
  return await pieRef.set(data);
}

while (piesGenerated < NUM_PIES) {
  console.log('*** *** *** *** *** ***');
  const pie = generatePie();
  const pieSig = pie.signature();
  console.log('a) Canidate [', piesGenerated, '] - Sig:', pieSig, ' Data:', pie.json());
  const pieRef = products.doc(pieSig);
  console.log('b) Checking canidate [', piesGenerated, ']');
  const doc = checkPie(pieRef);
  if (!doc.exists) {
    console.log('c) Adding new pie!');
    persistPie(pieRef, pie.json());
    piesGenerated++;
  } else {
    console.log('c) Pie already exists:', doc.data());
  }
}
