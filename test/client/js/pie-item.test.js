/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint max-len: ["off"] */

function prepare() {
  this.container = document.createElement('div');
  document.body.appendChild(this.container);
};

function cleanUp() {
  this.container.remove();
  this.container = null;
};

describe('PieItem', function() {

  const pie = {
    'calories' : 457,
    'dough' : 'biscuit',
    'filling' : 'curd',
    'price' : 70,
    'signature' : 'chocolate-curd-biscuit-x',
    'topping' : 'chocolate',
    'weight' : 370
  };

  before(prepare);
  after(cleanUp);

  beforeEach(function() {
    this.container.innerHTML = `<pie-item></pie-item>`;
    return customElements.whenDefined('pie-item')
      .then(_ => {
        this.el = this.container.querySelector('pie-item');
      });
  });

  it('Renders pie-img element', function() {
    let img = this.el.querySelector('pie-img');
    expect(img).to.not.be.null;
  });

  it('Renders price property', function() {
    this.el.pie = pie;
    let price = this.el.querySelector('.pie-price');
    expect(price.innerText).to.equal(`price: ${pie.price}`);
  });

  it('Renders weight property', function() {
    this.el.pie = pie;
    let weight = this.el.querySelector('.pie-weight');
    expect(weight.innerText).to.equal(`weight: ${pie.weight}`);
  });

  it('Passes properties to pie-img', function() {
    this.el.pie = pie;
    let img = this.el.querySelector('pie-img');
    expect(img.getAttribute('topping')).to.equal(pie.topping);
    expect(img.getAttribute('filling')).to.equal(pie.filling);
    expect(img.getAttribute('dough')).to.equal(pie.dough);
  });
});
