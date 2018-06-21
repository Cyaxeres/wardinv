import {formatMoney} from 'accounting';

class Cart {
  //Gets the old cart if it exists or initializes a new one
  constructor(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
  }

  //Adds an "item object" to the "items object"
  add(item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        item: item,
        qty: 0,
        price: 0
      };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.uprice * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.uprice;
  }

  //Makes an array of the items object
  generateArray() {
    let arr = [];
    for (let id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  }

  makeDisplayPrices() {
    let arr = [];
    for (let id in this.items) {
      arr.push(formatMoney((this.items[id].price)));
    }
    return arr;
  }

  remove(id) {
    this.totalQty -= this.items[id].qty;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
    if(this.totalQty <= 0 && this.items === {}) {
        this.totalPrice = 0;
    }
  }

  updateQuantity(id, nQty){
    //get item
    let storedItem = this.items[id];
    //remove previous quantity
    this.totalQty -= storedItem.qty;
    //add new quantity
    storedItem.qty = nQty;
    this.totalQty += storedItem.qty;
    //update price
    this.totalPrice -= this.items[id].price;
    storedItem.price = storedItem.item.uprice * storedItem.qty;
    //Update total
    this.totalPrice += storedItem.price;
  }
}

module.exports = Cart;

// Cart {
//     items = {
//         "988377839289282":{
//             item:Joe,
//             qty: 5,
//             price: 3802
//         }
//         "988377839289282":{
//             item:Joe,
//             qty: 5,
//             price: 3802
//         }
//         "988377839289282":{
//             item:Joe,
//             qty: 5,
//             price: 3802
//         }
//         "988377839289282":{
//             item:Joe,
//             qty: 5,
//             price: 3802
//         }
//         "988377839289282":{
//             item:Joe,
//             qty: 5,
//             price: 3802
//         }
//     }
//     Qty = qty - 5
//     Price = now - pro
// }
