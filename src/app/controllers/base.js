import User from "../models/user";
exports.loggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

exports.signup = (req, res) => {
  if (req.session.user) {
    res.redirect("/products");
  } else {
    res.render("signup", {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session
    });
  }
};

exports.login = (req, res) => {
  if (req.session.user) {
    res.redirect("/products");
  } else {
    res.render("login", {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session
    });
  }
};

exports.verifyPin = (req, res) => {
  let orderID = req.body.orderID;
  let sender = req.body.senderID;
  let senderPin = req.body.pin;

  User.findOne({ _id: sender })
    .then(
      user => {
        if (user.pin === senderPin) {
          req.session.verified = true;
          req.flash("success", "You may now deliver");
          res.redirect("/orders/" + orderID);
        } else {
          throw "Wrong pin! Try again?";
        }
      },
      err => {
        throw err;
      }
    )
    .catch(err => {
      req.session.verified = null;
      req.flash("error", err);
      res.redirect("/orders/" + orderID);
    });
};
