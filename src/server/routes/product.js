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
import Cart from '../../services/cart';

const product = {
  get: (req, res, next) => {
    const productId = req.params.id.split(';')[0];
    fbAdmin.firestore()
      .collection('products')
      .doc(productId).get()
      .then((snapshot) => {
        res.render('product', {
          product: snapshot.data(),
          key: snapshot.id,
          productId: productId,
          cartTotalQty: req.session.cart ? req.session.cart.totalQty : 0,
        });
      });
  },
  addToCart: (req, res, next) => {
    const cart = new Cart(req.session.cart);
    fbAdmin.database().ref('/products/' + req.params.id)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          const item = {
            key: snapshot.key,
            product: snapshot.val(),
          };
          cart.add(item, 1);
        } else {
          req.session.notify = 'No item found :(';
        }
        const back = req.query.back || '';
        req.session.cart = cart;
        res.redirect(['/', back].join(''));
      });
  },
};

export default product;
