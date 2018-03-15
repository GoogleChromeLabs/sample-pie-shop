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
     Object.values(this.items).forEach(item => {
       totalQty += item.quantity;
       totalPrice += item.totalPrice;
     });
     this.totalPrice = totalPrice;

     this.totalQty = totalQty;
   };

   this.add = (item, quantity) => {
      console.log('adding')
      if (!this.items[item.key]) {
        this.items[item.key] = Object.assign({key: item.key}, item.product);
        this.items[item.key].quantity = 0;
      }
      this.items[item.key].quantity += 1;
      this.items[item.key].totalPrice += this.items[item.key].quantity * this.items[item.key].price;

      console.log(this.items[item.key].quantity)
      console.log(this.items[item.key].price)
      console.log(this.totalPrice)

      this.updateTotals();
   };

   this.items = oldCart ? oldCart.items : {};
   this.totalPrice = oldCart ? oldCart.totalPrice : 0;
   this.totalQty = oldCart ? oldCart.totalQty: 0;
 }
