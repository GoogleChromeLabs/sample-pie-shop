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
export default function Cart(oldCart) {
  this.updateTotals = () => {
    let totalPrice = 0;
    let totalQty = 0;
    Object.values(this.items).forEach((item) => {
      totalQty += item.quantity;
      totalPrice += item.quantity * item.price;
    });
    this.totalPrice = totalPrice;
    this.totalQty = totalQty;
  };

  this.add = (item, quantity) => {
    const items = this.items;
    const key = item.url;
    if (!items[key]) {
      items[key] = Object.assign({key: key}, item);
      items[key].quantity = 0;
    }
    items[key].quantity += 1;
    this.updateTotals();
  };

  this.items = oldCart ? oldCart.items : {};
  this.totalPrice = oldCart ? oldCart.totalPrice : 0;
  this.totalQty = oldCart ? oldCart.totalQty: 0;
}
