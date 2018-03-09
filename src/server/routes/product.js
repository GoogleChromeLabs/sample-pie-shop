/**
 *
 *  Online store PWA sample.
 *  Copyright 2017 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

import fbAdmin from '../../services/firebase';

const product = {
  get: (req, res, next) => {
    const productId = req.params.id.split('+')[1];
    fbAdmin.database().ref('/products/' + productId).once('value').then((snapshot) => {
      res.render('product', {
        product: snapshot.val(),
        productId: productId,
      });
    });
  },
  addToCart: (req, res, next) => {
    console.log('add to cart');
    res.render('product', {
      title: 'Apple Pie — Pie Shop',
      product_name: 'Apple Pie',
      product_description: 'A classic dessert, with our unique exotic spice blend.'});
  },
}

export default product;
