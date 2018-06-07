// TODO: REMOVE THIS FILE

exports.loggedIn = (req, res, next) => {
  if (req.session.user) { // req.session.passport._id
    next();
  } else {
    res.redirect('/login');
  }
}

exports.products = (req, res) => {
  res.render('home', {
    error: req.flash("error"),
    success: req.flash("success"),
    session: req.session
  });
}

exports.signup = (req, res) => {
  if (req.session.user) {
    res.redirect('/products');
  } else {
    res.render('signup', {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session
    });
  }
}

exports.login = (req, res) => {
  if (req.session.user) {
    res.redirect('/products');
  } else {
    res.render('login', {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session
    });
  }
}
