import Products from '../models/product';

exports.loggedIn = (req, res, next) => {
  if (req.session.user) { // req.session.passport._id
    next();
  } else {
    res.redirect('/login');
  }
}

exports.home = (req, res) => {
  //Find items and send them to view
  Products.find({}, function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.render('home', {
        error: req.flash("error"),
        success: req.flash("success"),
        session: req.session,
        products: products
      });
    }
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

// const addProducts = () => {
//   Products.create({
//     name: 'Zion necklace', //Example: War Pike
//     unit: 'pack', //Example: pack
//     unitq: 100, //Example: 50 (in a pack)
//     uprice: 120.00, //$450 per pack
//     quantity: 200, //Example: How many packs?
//     type: 'medical', //Example: medical, general supplies
//     reorder: 5 // Example: Trigger alert when there are only two packs left
//   }, (err, item) => {
//     if (err) {
//       console.log(err);
//     } else {
//         console.log(item);
//       return item;
//     }
//   });

// }

exports.viewProduct = (req, res) => {
  const prodID = req.params.id;
  Products.findById(prodID, (err, product) => {
    if (err) {
      console.log(err);
    } else {
      res.render('product_view', {
        product: product
      });
    }
  });
}

exports.newProduct = (req, res) => {
  res.render('product_new');
}

exports.createProduct = (req, res) => {
  let pname = req.body.name;
  let punit = req.body.unit;
  let punitq = req.body.unitq;
  let puprice = req.body.uprice;
  let pquantity = req.body.quantity;
  let ptype = req.body.type;
  let pexpdate = req.body.expdate;
  let preorder = req.body.reorder;

  const newProduct = {
    name: pname,
    unit: punit,
    unitq: punitq,
    uprice: puprice,
    quantity: pquantity,
    type: ptype,
    expdate: pexpdate,
    reorder: preorder
  };

  //! POSTMAN testing
  //! res.send('Name is ' + newItem.name);

  //Create new product
  Products.create(newProduct, (err, product) => {
    if (err) {
      req.flash("error", err);
      res.redirect('/products');
    } else {
      req.flash("success", `${product.name} added successfully`)
      res.redirect('/products');
    }
  });
}
