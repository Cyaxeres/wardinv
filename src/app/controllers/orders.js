import Orders from "../models/order";
import Product from "../models/product";
import Cart from "../models/cart";
import { formatMoney } from "accounting";

exports.home = (req, res) => {
  //Get all active orders
  Orders.find(
    {
      active: true
    },
    (err, orders) => {
      if (err) {
        res.render("orders", {
          error: req.flash("error")
        });
      } else {
        let displayPrices = orders.map(x => formatMoney(x.cart.totalPrice));
        res.render("orders", {
          orders: orders,
          prices: displayPrices,
          success: req.flash("success"),
          title: "All Orders"
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
    if (err) {
      res.render("vieworder", {
        session: req.session,
        error: req.flash("error")
      });
    } else {
      let cart = new Cart(order.cart);
      let verif = req.session.verified;
      req.session.verified = null;
      res.render("vieworder", {
        products: cart.generateArray(),
        totalPrice: formatMoney(cart.totalPrice),
        displayPrices: cart.makeDisplayPrices(),
        totalQty: cart.totalQty,
        order: order,
        session: req.session,
        verified: verif,
        success: req.flash("success"),
        error: req.flash("error")
      });
    }
  });
};

exports.history = (req, res) => {
  const user = req.session.user._id;
  //Get all active orders
  Orders.find(
    {
      "sender.id": user
    },
    (err, orders) => {
      if (err) {
        res.render("orders", {
          error: req.flash("error")
        });
      } else {
        let displayPrices = orders.map(x => formatMoney(x.cart.totalPrice));
        res.render("orders", {
          orders: orders,
          prices: displayPrices,
          success: req.flash("success"),
          title: "Your Orders"
        });
        // console.log(orders);
      }
    }
  );
};

exports.checkout = (req, res) => {
  const curOrder = req.params.id;

  Orders.findById(curOrder)
    .then(order => {
      let cartItems = Object.values(order.cart.items);
      let filteredCart = cartItems.filter(
        item => item.item.quantity < item.qty
      );
      if (filteredCart.length <= 0) {
        return cartItems;
      } else {
        filteredCart.forEach(product => {
          throw `Only ${product.item.quantity} "${product.item.name}" in stock`;
        });
      }
    })
    .then(items => {
      return updateItems(items);
    })
    .then(newItems => {
      return deactivateOrder(curOrder, req.session.user);
    })
    .then(newOrder => {
      req.session.verified = null;
      req.flash("success", "Order completed!");
      res.redirect("/orders/" + curOrder);
    })
    .catch(err => {
      req.flash("error", err);
      res.redirect("/orders/" + curOrder);
    });
};

/**
 * updates item quantities
 *
 * @param {*} items
 * @returns array of updated items
 */
const updateItems = async function(items) {
  let newItems = [];
  for (let product of items) {
    let newQty = product.item.quantity - product.qty;
    let newItem = await Product.findByIdAndUpdate(
      product.item._id,
      {
        quantity: newQty
      },
      { new: true }
    );
    newItems.push(newItem);
  }
  return newItems;
};

/**
 * deactivates order
 *
 * @param {*} order
 * @param {*} user
 * @returns deactivated order
 */
const deactivateOrder = async function(order, user) {
  let nOrder = await Orders.findOneAndUpdate(
    {
      _id: order
    },
    {
      $set: {
        active: false,
        dispenser: user
      }
    },
    {
      sort: {
        _id: -1
      }
    }
  );
  return nOrder;
};
