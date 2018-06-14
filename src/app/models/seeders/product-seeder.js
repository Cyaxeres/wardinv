import mongoose from 'mongoose';
import configDB from '../../../config/database';
import Product from '../../models/product';
mongoose.connect(configDB.url);
let exit = () => mongoose.disconnect();
let done = 0;

var products = [
  new Product({
    name: 'Needles',
    unit: 'pack',
    unitq: 50,
    uprice: 220.50,
    quantity: 250,
    type: 'medical',
    expdate: '2018-06-18',
    reorder: 10
  }),
  new Product({
    name: 'Dynometrin 500mL',
    unit: 'one',
    unitq: 1,
    uprice: 1325.00,
    quantity: 12,
    type: 'medical',
    expdate: '2018-07-09',
    reorder: 100
  }),
  new Product({
    name: 'Pentel RSVP Blk Fine',
    unit: 'pack',
    unitq: 10,
    uprice: 1200.00,
    quantity: 102,
    type: 'general',
    expdate: '2018-06-21',
    reorder: 10
  }),
  new Product({
    name: 'Apsrin 500g',
    unit: 'pack',
    unitq: 12,
    uprice: 730.25,
    quantity: 150,
    type: 'medical',
    expdate: '2018-09-18',
    reorder: 5
  }),
];

let seedProducts = () => {
  //Delete all the data so far
  Product.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
  });
  //Add the new data
  for (let x = 0; x < products.length; x++) {
    products[x].save((err, product) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${product.name} was added.`);
        done++;
        if (done === products.length) {
          exit();
        }
      }
    });
  }
}

module.exports = seedProducts;
