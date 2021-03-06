import base from "../app/controllers/base";
import products from "../app/controllers/products";
import cart from "../app/controllers/cart";
import orders from "../app/controllers/orders";
import users from "../app/controllers/users";
import dockets from "../app/controllers/dockets";

//you can include all your controllers

module.exports = (app, passport) => {
  app.get("/login", base.login);
  app.get("/logout", base.logout);

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
  app.get("/users/new", base.checkAuth(0), base.signup);
  app.patch("/users/:id", base.checkAuth(0), users.update);
  app.get("/users/:id/edit", base.checkAuth(0), users.edit);
  app.get("/users", base.checkAuth(0), users.home);
  app.get("/products/new", base.checkAuth(1), products.newProduct);
  app.get("/products/:id/edit", base.checkAuth(1), products.edit);
  app.get("/products/:id", base.checkAuth(0), products.viewProduct);
  app.put("/products/:id", base.checkAuth(1), products.update);
  app.get("/products", base.checkAuth(2), products.home);
  app.post("/products", base.checkAuth(1), products.createProduct);

  app.get("/cart/add/:id", cart.addToCart);
  app.get("/cart/delete/:id", base.checkAuth(2), cart.removeFromCart);

  //Submit Order
  app.post("/cart/checkout", base.checkAuth(2), cart.checkout);
  app.get("/cart", base.checkAuth(2), cart.viewCart);
  //Update cart
  app.post("/cart", base.checkAuth(2), cart.updateQuantity);

  //Orders
  app.post("/orders/sender/verify", base.checkAuth(1), base.verifyPin);
  app.get("/orders/delete/:id", base.checkAuth(2), orders.delete);
  app.get("/orders/history", base.checkAuth(2), orders.history);
  app.get("/orders/:id/checkout", base.checkAuth(1), orders.checkout);
  app.get("/orders/:id", base.checkAuth(2), orders.view);
  // app.post("/orders/:id", base.checkAuth(2), orders.edit);
  app.get("/orders", base.checkAuth(1), orders.home);

  app.get("/dockets/new", base.checkAuth(2), dockets.new);
  app.get("/dockets/:id/edit", base.checkAuth(0), dockets.edit);
  app.get("/dockets/:id", base.checkAuth(1), dockets.view);
  app.put("/dockets/:id", base.checkAuth(0), dockets.update);
  app.get("/dockets", base.checkAuth(2), dockets.home);
  app.post("/dockets", base.checkAuth(2), dockets.add);
};
