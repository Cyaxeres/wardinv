import Products from "../models/product";
import { formatMoney } from "accounting";

exports.home = (req, res) => {
  //Find items and send them to view
  Products.find({}, function(err, products) {
    if (err) {
      res.render("product/index", {
        error: req.flash("error"),
        cart: req.session.cart,
        products: products
      });
    } else {
      let displayPrices = products.map(x => formatMoney(x.uprice));
      res.render("product/index", {
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

exports.viewProduct = (req, res) => {
  // const prodID = req.params.id;
  // Products.findById(prodID, (err, product) => {
  //   const displayPrice = formatMoney(product.uprice);
  //   if (err) {
  //     res.render("product/view", {
  //       error: req.flash("error"),
  //       product: product
  //     });
  //   } else {
  //     res.render("product/view", {
  //       product: product,
  //       displayPrice: displayPrice
  //     });
  //   }
  // });
  res.redirect("/products");
};

exports.newProduct = (req, res) => {
  res.render("product/new");
};

exports.createProduct = (req, res) => {
  const newProduct = {
    name: req.body.name,
    unit: req.body.unit,
    unitq: req.body.unitq,
    uprice: req.body.uprice,
    quantity: req.body.quantity,
    type: req.body.type,
    expdate: req.body.expdate,
    reorder: req.body.reorder
  };

  //Create new product
  Products.create(newProduct, (err, product) => {
    if (err) {
      req.flash("error", "Could not add product. Maybe it already exists?");
      res.redirect("/products");
    } else {
      req.flash("success", `${product.name} was added successfully`);
      res.redirect("/products");
    }
  });
};
