import Products from "../models/product";
import { formatMoney } from "accounting";

// exports.loggedIn = (req, res, next) => {
//   if (req.session.user) { // req.session.passport._id
//     next();
//   } else {
//     res.redirect('/login');
//   }
// }

exports.home = (req, res) => {
  //Find items and send them to view
  Products.find({}, function(err, products) {
    if (err) {
      res.render("home", {
        error: req.flash("error"),
        cart: req.session.cart,
        products: products
      });
    } else {
      let displayPrices = products.map(x => formatMoney(x.uprice));
      res.render("home", {
        success: req.flash("success"),
        cart: req.session.cart,
        products: products,
        displayPrices: displayPrices,
        session: req.session,
        error: req.flash("error")
      });
    }
  });
};

// exports.signup = (req, res) => {
//   if (req.session.user) {
//     res.redirect('/products');
//   } else {
//     res.render('signup', {
//       error: req.flash("error"),
//       success: req.flash("success"),
//       session: req.session
//     });
//   }
// }

// exports.login = (req, res) => {
//   if (req.session.user) {
//     res.redirect('/products');
//   } else {
//     res.render('login', {
//       error: req.flash("error"),
//       success: req.flash("success"),
//       session: req.session
//     });
//   }
// }

exports.viewProduct = (req, res) => {
  const prodID = req.params.id;
  Products.findById(prodID, (err, product) => {
    const displayPrice = formatMoney(product.uprice);
    if (err) {
      res.render("product_view", {
        error: req.flash("error"),
        product: product
      });
    } else {
      res.render("product_view", {
        product: product,
        displayPrice: displayPrice
      });
    }
  });
};

exports.newProduct = (req, res) => {
  res.render("product_new");
};

exports.createProduct = (req, res) => {
  let pname = req.body.name;
  let punit = req.body.unit;
  let punitq = req.body.unitq;
  let puprice = req.body.uprice;
  let pquantity = req.body.quantity;
  let ptype = req.body.type;
  let pexpdate = req.body.expdate;
  let preorder = req.body.reorder;

  const newProduct = {
    name: pname,
    unit: punit,
    unitq: punitq,
    uprice: puprice,
    quantity: pquantity,
    type: ptype,
    expdate: pexpdate,
    reorder: preorder
  };

  //Create new product
  Products.create(newProduct, (err, product) => {
    if (err) {
      req.flash("error", err);
      res.redirect("/products");
    } else {
      req.flash("success", `${product.name} was added successfully`);
      res.redirect("/products");
    }
  });
};
