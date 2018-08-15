import Products from "../models/product";
import Cart from "../models/cart";
import Order from "../models/order";
import Docket from "../models/docket";
import { formatMoney } from "accounting";

exports.addToCart = (req, res) => {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  //Fetch Product form DB
  Products.findById(productId, (err, product) => {
    if (err) {
      req.flash("error", err);
      res.redirect("/products");
    } else {
      cart.add(product, productId);
      req.session.cart = cart;
      // ! console.log(req.session.cart);
      req.flash("success", `${product.name} was added to cart`);
      res.redirect("/products");
    }
  });
};

exports.viewCart = (req, res) => {
  if (!req.session.cart || req.session.cart.items == {}) {
    res.render("cart/index", {
      products: null
    });
  } else {
    let cart = new Cart(req.session.cart);
    let oedit = req.session.oedit || null;
    req.session.oedit = null;
    let dockets = undefined;
    Docket.find({ status: "active" }, (err, foundDockets) => {
      dockets = foundDockets;
      res.render("cart/index", {
        products: cart.generateArray(),
        totalPrice: formatMoney(cart.totalPrice),
        displayPrices: cart.makeDisplayPrices(),
        totalQty: cart.totalQty,
        session: req.session,
        oedit: oedit,
        dockets: dockets,
        success: req.flash("success"),
        error: req.flash("error")
      });
    });
  }
};

exports.removeFromCart = (req, res) => {
  if (!req.session.cart || req.session.cart.items == {}) {
    res.render("cart/index", {
      products: null
    });
  }
  let cart = new Cart(req.session.cart);
  let id = req.params.id;
  cart.remove(id);
  req.session.cart = cart;
  res.redirect("/cart");
};

exports.updateQuantity = (req, res) => {
  if (!req.session.cart || req.session.cart.items == {}) {
    res.render("cart/index", {
      products: null
    });
  }
  const cart = new Cart(req.session.cart);
  let id = req.body.product_id;
  let newQty = parseInt(req.body.qty);
  cart.updateQuantity(id, newQty);
  // console.log(cart);
  let product = cart.items[id].item;
  req.flash("success", `${product.name} was updated`);
  req.session.cart = cart;
  res.redirect("/cart");
};

exports.checkout = (req, res) => {
  //add order to database
  const cart = new Cart(req.session.cart);
  let docno = req.body.docket;
  let order = new Order({
    sender: {
      id: req.session.user,
      username: req.session.user.name
    },
    cart: cart,
    docket: docno
  });
  Order.create(order, (err, result) => {
    if (err) {
      req.flash("error", "Oops! Something went wrong. Try again?");
      res.redirect("/products");
      res.send(req.body);
    } else if (result) {
      req.flash("success", "Order submitted! Feel free to pick it up!");
      req.session.cart = null;
      res.redirect("/products");
    }
  });
};
