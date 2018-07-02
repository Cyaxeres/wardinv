import Orders from "../models/order";
import Product from "../models/product";
import Cart from "../models/cart";
import {
  formatMoney
} from "accounting";

exports.home = (req, res) => {
  //Get all active orders
  Orders.find({
      active: true
    },
    (err, orders) => {
      if (err) {
        req.flash("error", err);
        res.render("orders");
      } else {
        let displayPrices = orders.map(x => formatMoney(x.cart.totalPrice));
        res.render("orders", {
          orders: orders,
          prices: displayPrices,
          success: req.flash("success"),
          error: req.flash("error")
        });
        // console.log(orders);
      }
    }
  ).sort({
    created_at: -1
  });
};

exports.view = (req, res) => {
  const orderId = req.params.id;
  Orders.findById(orderId, (err, order) => {
    let cart = new Cart(order.cart);
    // let cart = new Cart(req.session.cart);
    res.render("vieworder", {
      products: cart.generateArray(),
      totalPrice: formatMoney(cart.totalPrice),
      displayPrices: cart.makeDisplayPrices(),
      totalQty: cart.totalQty,
      order: order,
      session: req.session
    });
  });
};
// ! AYY FUTURE ME: REFACTOR THIS SHIT BRUH DAMN LMAO
exports.checkout = (req, res) => {
  const curOrder = req.body.orderID;
  //Get order
  Orders.findById(curOrder, (err, order) => {
    checkOrderItems(order);
  });
  //For each item in the order check if the cart qty is lower than the qty in the cart
  //If they are lower than the available then remove them from the qty of products and update order to be inactive
  //else return error

  //Passes each item to  be updated
  const checkOrderItems = order => {
    let cartItems = Object.values(order.cart.items);
    // console.log(cartItems[0].item._id);
    let checkArray = cartItems.filter(item => item.item.quantity > item.qty);
    if (checkArray.length === cartItems.length) {
      // console.log(checkArray.map(item => item.item.quantity - item.qty));
      cartItems.forEach(product => updateProduct(product));
    }
    //else reload page with an error
  };

  //Updates product values
  const updateProduct = product => {
    let newQty = product.item.quantity - product.qty;
    // console.log(newQty);
    Product.findOneAndUpdate({
      _id: product.item._id
    }, {
      $set: {
        "quantity": newQty
      }
    }, (err, result) => {
      // res.redirect('/orders');
      // res.finished = true;
      // res.end();
      if (err) {
        //Redirect with error
        console.log(err);
      } else {
        //Update Order
        // console.log(result);
        updateOrder(curOrder);
        req.flash("success", "Order completed");
        res.redirect('/orders/' + curOrder);
        res.finished = true;
        res.end();

      }
      // return result;
    });
  };

  const updateOrder = order => {
    Orders.findOneAndUpdate({
        _id: order
      }, {
        $set: {
          active: false,
          dispenser: req.session.user
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true
      },
      (err, result) => {
        if (err) {
          return false;
        } else {
          return true;
        }
      }
    );
  }

};
