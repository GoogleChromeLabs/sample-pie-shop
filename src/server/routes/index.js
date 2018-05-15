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
  fbAdmin.firestore().collection('products').get()
    .then((snapshot) => {
      const products = [];
      snapshot.forEach((record) => {
        const product = record.data();
        product.key = record.id;
        products.push(product);
      });
      res.render('index', {
        title: `Pie Shop`,
        products: products,
        categories: categories,
        cartTotalQty: req.session.cart ? req.session.cart.totalQty : 0,
        scripts: [
          'js/index_main.js',
        ],
      });
    });
};

export default index;
