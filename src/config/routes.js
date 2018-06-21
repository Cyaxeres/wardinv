// import home from '../app/controllers/home';
import product from '../app/controllers/products';
import cart from '../app/controllers/cart';
// import order from '../app/controllers/order';


//you can include all your controllers

module.exports = (app, passport) => {

  app.get('/login', product.login);
  app.get('/signup', product.signup);

  app.get('/', product.loggedIn, product.home); //home
  app.get('/products', product.loggedIn, product.home); //home

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
  app.get('/products/new', product.newProduct);

  //View product
  app.get('/products/:id', product.viewProduct);

  //Create Product
  app.post('/products', product.createProduct);

  //Adds an item to the cart
  app.get('/cart/new/:id', cart.addToCart);

  //Remove item from cart
  app.get('/cart/delete/:id', cart.removeFromCart);

  //View cart
  app.get('/cart', cart.viewCart);

  //Update cart
  app.post('/cart', cart.updateQuantity);

  //Submit Order
  app.post('/cart/checkout', cart.checkout);
}
