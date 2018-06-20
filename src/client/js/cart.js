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

class Cart {
  constructor() {
  }
  init() {
    _addClickHandlers();
    _setCartBadge();
  }
}

function _getCart() {
  const cart = localStorage.cart;
  console.log('Got cart', cart);
  return cart ? JSON.parse(cart) : {};
}

function _setCart(cart) {
  localStorage.cart = JSON.stringify(cart);
  console.log('Setting cart', _getCart());
}

function _addClickHandlers() {
  const elements = document.querySelectorAll('.add-to-cart');
  for (const element of elements) {
    element.onclick = (event) => {
      _addToCart(event.target.dataset.id);
    };
  }
}

function _addToCart(productId) {
  const cart = _getCart();
  cart[productId] = cart[productId] ? cart[productId] + 1 : 1;
  _setCart(cart);
  _setCartBadge();
}

// function _removeFromCart(productId) {
//   const cart = _getCart();
//   cart[productId] -= 1;
//   if (cart[productId] === 0) {
//     delete cart[productId];
//   }
//   _setCart(cart);
//   _setCartBadge();
// }

function _numProducts() {
  const cart = _getCart();
  return Object.getOwnPropertyNames(cart).length === 0 ? 0 :
    Object.values(cart).reduce((a, b) => a + b);
}

function _setCartBadge() {
  const cartElement = document.getElementById('cart');
  cartElement.dataset.badge = _numProducts();
}

export default new Cart();
