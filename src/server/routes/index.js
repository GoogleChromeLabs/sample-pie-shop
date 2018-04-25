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
import categories from '../../data/categories';

const index = (req, res, next) => {
  fbAdmin.database().ref('products')
    .orderByChild('price')
    .once('value')
    .then((snapshot) => {
      const products = [];
      snapshot.forEach(record => {
        let product = record.val();
        product.key = record.key;
        products.push(product);
      })
      res.render('index', {
        title: `The Shop`,
        products: products,
        categories: categories,
        cartTotalQty: req.session.cart ? req.session.cart.totalQty : 0,
        scripts: [
          'js/lazy-img.js',
        ],
      });
    });
};

export default index;
