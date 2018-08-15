import mongoose from "mongoose";
import Product from "../product";
import Order from "../order";
import configDB from "../../../config/database.js";
mongoose.connect(configDB.url);

let done = 0;

var products = [
  new Product({
    name: "Dynometrin 500mL",
    unit: "one",
    unitq: 1,
    uprice: 1325.0,
    quantity: 12,
    type: "medical",
    expdate: "2018-07-09",
    reorder: 100
  }),
  new Product({
    name: "Needles",
    unit: "pack",
    unitq: 50,
    uprice: 220.5,
    quantity: 25,
    type: "medical",
    expdate: "2018-06-18",
    reorder: 10
  }),
  new Product({
    name: "Pentel RSVP Blk Fine",
    unit: "pack",
    unitq: 10,
    uprice: 1200.0,
    quantity: 102,
    type: "general",
    expdate: "2018-06-21",
    reorder: 10
  }),
  new Product({
    name: "Asprin 500g",
    unit: "pack",
    unitq: 12,
    uprice: 730.25,
    quantity: 150,
    type: "medical",
    expdate: "2018-09-18",
    reorder: 5
  }),
  new Product({
    name: "Wata",
    unit: "pack",
    unitq: 24,
    uprice: 760.35,
    quantity: 10,
    type: "medical",
    expdate: "2018-09-18",
    reorder: 2
  }),
  new Product({
    name: "Lysol",
    unit: "pack",
    unitq: 10,
    uprice: 2367.56,
    quantity: 12,
    type: "medical",
    expdate: "2018-09-18",
    reorder: 2
  })
];

let seedProducts = () => {
  //Delete all the data so far
  Product.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("> Products removed");
      Order.remove({}, err => {
        if (err) {
          console.log(err);
        } else {
          console.log("> Orders removed");
        }
      });
      console.log("> Adding new products");
      newData();
    }
  });

  let newData = () => {
    // Add the new data
    for (var x = 0; x < products.length; x++) {
      products[x].save(err => {
        if (err) {
          console.log(err);
        } else {
          done++;
          if (done === products.length) {
            console.log(`> Products added.`);
            exit();
          }
        }
      });
    }
  };
};

let exit = () => mongoose.disconnect();

module.exports = seedProducts;
