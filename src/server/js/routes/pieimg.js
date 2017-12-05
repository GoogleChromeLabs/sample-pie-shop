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

import {Router} from 'express';
import fs from 'fs';
import Pie from '../../../shared/js/pie.js';

const router = new Router();

router.get('/pie-svg', (req, res, next) => {
  const pie = new Pie();
  pie.topping = req.query.topping;
  pie.filling = req.query.filling;
  pie.dough = req.query.dough;
  pie.deco = req.query.deco;
  res.writeHead(200, {'Content-Type': 'image/svg+xml'});
  res.write(pie.svg());
  res.end();
});

export default router;
