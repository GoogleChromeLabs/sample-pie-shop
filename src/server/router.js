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
import index from './routes/index';
import search from './routes/search';
import category from './routes/category';
import product from './routes/product';
import cart from './routes/cart';
import payment from './routes/payment';
import products from './routes/products';

// enable URLs like foo.com/accessories
import categories from '../data/categories';
const categoryRoutes = categories.map((item) => {
  return '/' + item;
});

import {Router} from 'express';
const router = new Router();

router.get('/cart', cart);
router.get(categoryRoutes, category);
router.get('/confirmation', payment.confirm);
router.get(/\/(index.html)?$/, index);
router.get('/payment', payment.get);
router.post('/payment', payment.pay);
router.get('/product/:id', product.get);
router.post('/product/:id/cart', product.addToCart);
router.get('/products', products);
router.get('/search', search);

export default router;
