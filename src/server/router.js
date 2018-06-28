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
import appShell from './routes/app-shell';
import index from './routes/index';
import category from './routes/category';
import product from './routes/product';
import payment from './routes/payment';
import cart from './routes/cart';

// enable URLs like foo.com/accessories
import categories from '../data/categories';
const categoryRoutes = categories.map((item) => {
  return '/' + item;
});

import {Router} from 'express';
const router = new Router();

router.get('/app-shell', appShell);
router.get(categoryRoutes, category);
router.get('/cart', cart);
router.get('/payment', payment.get);
router.get('/confirmation', payment.confirm);
router.get(/\/(index.html)?$/, index);
router.get('/:id', product.get);

router.post('/:id/cart', product.addToCart);
router.post('/payment', payment.pay);

export default router;
