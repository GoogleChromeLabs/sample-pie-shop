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

const express = require('express');
const fs = require('fs');
const Pie = require('../models/pie.js');

const router = new express.Router();
const svgPath = `${__dirname}/../../../shared/views/pie.svg.hbs`;

router.get('/pie', (req, res, next) => {
  res.render('pie', {
    title: 'Pie',
    scripts: ['/js/pie.js'],
  });
});

router.get('/pie-svg', (req, res, next) => {
  fs.readFile(svgPath, (err, result) => {
    const pie = new Pie();
    pie.template = result.toString();
    pie.topping = req.query.topping;
    res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.write(pie.svg());
    res.end();
  });
});

module.exports = router;
