exports.loggedIn = (req, res, next) => {
  if (req.session.user) { // req.session.passport._id
    next();
  } else {
    res.redirect('/login');
  }
}


/** 
 * TODO: Remove this test code
 */
let items = [
  {
      name: 'Tuna Fish', 
      unit: 'tin', 
      quantity: 500
  },
  {
      name: 'Cat Heart', 
      unit: 'bowl', 
      quantity: 30
  },{
    name: 'Toilet Paper',
    unit: 'roll',
    quantity: 200
  }];

exports.home = (req, res) => {
  res.render('home', {
    error: req.flash("error"),
    success: req.flash("success"),
    session: req.session,
    items: items
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
    res.redirect('/home');
  } else {
    res.render('login', {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session
    });
  }
}
