exports.loggedIn = (req, res, next) => {
  if (req.session.user) { // req.session.passport._id
    next();
  } else {
    res.redirect('/login');
  }
}

exports.home = (req, res) => {
  res.render('home', {
    error: req.flash("error"),
    success: req.flash("success"),
    session: req.session
  });
}

exports.signup = (req, res) => {
  if (req.session.user) {
    res.redirect('/home');
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
    res.redirect('/home', {
      title: 'Home | Ward'
    });
  } else {
    res.render('login', {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session
    });
  }
}
