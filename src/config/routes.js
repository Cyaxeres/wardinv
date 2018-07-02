// import home from '../app/controllers/home';
import products from '../app/controllers/products';
import cart from '../app/controllers/cart';
import orders from '../app/controllers/orders';


//you can include all your controllers

module.exports = (app, passport) => {

  app.get('/login', products.login);
  app.get('/signup', products.signup);

  app.get('/', products.loggedIn, products.home); //home
  app.get('/products', products.loggedIn, products.home); //home

  // app.post('/signup', passport.authenticate('local-signup', {
  //     successRedirect: '/products', // redirect to the secure profile section
  //     failureRedirect: '/signup', // redirect back to the signup page if there is an error
  //     failureFlash: true // allow flash messages
  // }));
  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/products', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  //New Product Form
  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get('/products/new', products.newProduct);

  //View product
  app.get('/products/:id', products.viewProduct);

  //Create Product
  app.post('/products', products.createProduct);

  //Adds an item to the cart
  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get('/cart/new/:id', cart.addToCart);

  //Remove item from cart
  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get('/cart/delete/:id', cart.removeFromCart);

  //View cart
  //TODO: ADD LOGGED IN MIDDLEWARE
  app.get('/cart', cart.viewCart);

  //Update cart
  app.post('/cart', cart.updateQuantity);

  //Submit Order
  app.post('/cart/checkout', cart.checkout);

  //View all orders
  //TODO: ADD LOGGED IN & ROLE MIDDLEWARE
  app.get('/orders', orders.home);
  app.get('/orders/:id', orders.view);
  app.get('/orders/checkout/:id', orders.home);
  app.put('/orders', orders.checkout);
}
