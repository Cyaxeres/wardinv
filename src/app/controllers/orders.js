import Orders from '../models/order';

exports.home = (req, res) => {
  //Get all active orders
  Orders.find({
    "active": true
  }, (err, orders) => {
    if (err) {
      req.flash("error", err);
      res.render('orders');
    } else {
      res.send( {orders: orders});
    }
  });
}