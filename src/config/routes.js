import base from "../app/controllers/base";
import products from "../app/controllers/products";
import cart from "../app/controllers/cart";
import orders from "../app/controllers/orders";

//you can include all your controllers

module.exports = (app, passport) => {
  app.get("/login", base.login);
  app.get("/signup", base.signup);
  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/"); //Inside a callback… bulletproof!
    });
  });

  app.get("/", base.loggedIn, products.home); //home

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/login", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/products", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get("/products", base.loggedIn, products.home); //home
  app.get("/products/new", products.newProduct);
  app.post("/products", products.createProduct);
  app.get("/products/:id", products.viewProduct);
  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get("/cart/new/:id", cart.addToCart);

  //Remove item from cart
  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get("/cart/delete/:id", cart.removeFromCart);

  //View cart
  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get("/cart", cart.viewCart);

  //Update cart
  app.post("/cart", cart.updateQuantity);

  //Submit Order
  app.post("/cart/checkout", cart.checkout);
  app.post("/orders/sender/verify", base.verifyPin);

  //View all orders
  //TODO: ADD LOGGED IN & ROLE MIDDLEWARE
  app.get("/orders", orders.home);
  app.get("/orders/:id", orders.view);
  app.get("/orders/:id/checkout", orders.checkout);
  // app.get('/orders', orders.checkout);
};
