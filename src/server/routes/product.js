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

import {getProduct} from '../get-data';
import categories from '../../data/categories';
import Cart from '../../services/cart';

const product = {
  get: (req, res, next) => {
    const thisProduct = getProduct(req.params.id);
    if (thisProduct) {
      res.render('product', {
        cart: req.session.cart,
        categories: categories,
        layout: req.query.fragment ? 'fragment' : 'layout',
        product: thisProduct,
        scripts: [
          '/js/product_main.js',
        ],
        title: `pieshop: ${thisProduct.name}`,
      });
    } else {
      res.status(404);
      const error = new Error(`URL ${thisProduct.url} not found`);
      error.status = 404;
      next(error);
    }
  },
  addToCart: (req, res) => {
    const cart = new Cart(req.session.cart);
    const thisProduct = getProduct(req.params.id);
    if (thisProduct) {
      cart.add(thisProduct, 1);
    } else {
      req.session.notify = 'No item found';
    }
    req.session.cart = cart;
    res.redirect(req.get('Referrer'));
  },
};

export default product;
