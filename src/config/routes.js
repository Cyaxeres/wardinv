import base from "../app/controllers/base";
import products from "../app/controllers/products";
import cart from "../app/controllers/cart";
import orders from "../app/controllers/orders";

//you can include all your controllers

module.exports = (app, passport) => {
  app.get("/login", base.login);
  app.get("/users/new", base.checkAuth(0), base.signup);
  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/"); //Inside a callback… bulletproof!
    });
  });

  app.get("/", base.checkAuth(2), products.home); //home

  app.post(
    "/users",
    passport.authenticate("local-signup", {
      successRedirect: "/login", // redirect to the secure profile section
      failureRedirect: "/users/new", // redirect back to the signup page if there is an error
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
  app.get("/products", base.checkAuth(2), products.home); //home
  app.get("/products/new", base.checkAuth(1), products.newProduct);
  app.post("/products", base.checkAuth(1), products.createProduct);
  app.get("/products/:id", base.checkAuth(0), products.viewProduct);
  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get("/cart/new/:id", cart.addToCart);

  //Remove item from cart
  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get("/cart/delete/:id", base.checkAuth(2), cart.removeFromCart);

  //View cart
  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get("/cart", base.checkAuth(2), cart.viewCart);

  //Update cart
  app.post("/cart", base.checkAuth(2), cart.updateQuantity);

  //Submit Order
  app.post("/cart/checkout", base.checkAuth(2), cart.checkout);
  app.post("/orders/sender/verify", base.checkAuth(1), base.verifyPin);

  //View all orders
  //TODO: ADD LOGGED IN & ROLE MIDDLEWARE
  app.get("/orders", base.checkAuth(1), orders.home);
  app.get("/orders/history", base.checkAuth(2), orders.history);
  app.get("/orders/:id", base.checkAuth(1), orders.view);
  app.get("/orders/:id/checkout", base.checkAuth(1), orders.checkout);
};
