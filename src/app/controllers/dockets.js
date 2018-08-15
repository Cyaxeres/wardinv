import Docket from "../models/docket";
import Order from "../models/order";
import { formatMoney } from "accounting";

exports.new = (req, res) => {
  res.render("docket/new");
};

exports.add = (req, res) => {
  let newDocket = new Docket({
    docno: req.body.docno,
    name: req.body.name,
    status: req.body.status
  });

  Docket.create(newDocket, (err, docket) => {
    if (err) {
      req.flash(
        "error",
        "Could not create docket. Maybe they are in the dropdown already"
      );
      res.redirect("/dockets");
    } else if (docket) {
      req.flash("success", "Docket added");
      res.redirect("/dockets");
    }
  });
};

exports.home = (req, res) => {
  //Get all active docket
  Docket.find({}, (err, dockets) => {
    if (err) {
      res.render("docket/index", {
        error: req.flash("error")
      });
    } else {
      res.render("docket/index", {
        dockets: dockets,
        success: req.flash("success"),
        error: req.flash("error"),
        title: "Dockets"
      });
    }
  }).sort({
    status: 1,
    created_at: -1
  });
};

exports.edit = (req, res) => {
  Docket.findById(req.params.id, (err, foundDocket) => {
    if (err) {
      req.flash("Could not find docket");
      res.redirect("/dockets");
    } else if (foundDocket) {
      let docket = foundDocket;
      res.render("docket/new", { docket: docket });
    }
  });
};

exports.update = (req, res) => {
  Docket.findByIdAndUpdate(
    req.params.id,
    req.body.docket,
    (err, updatedDocket) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/dockets");
      } else if (updatedDocket) {
        req.flash("success", "Docket updated");
        res.redirect("/dockets");
      }
    }
  );
};

exports.view = (req, res) => {
  Docket.findById(req.params.id)
    .select("-__v")
    .exec()
    .then(docket => {
      if (docket) {
        Order.find({ docket: req.params.id, active: false })
          // .select("_id sender.username cart.totalQty cart.totalPrice")
          .exec()
          .then(orders => {
            let cartReducer = (accumulator, currentValue) =>
              accumulator + currentValue.cart.totalPrice;
            let cartTotal = formatMoney(orders.reduce(cartReducer, 0));

            orders = orders.map(order => {
              return {
                _id: order._id,
                sender: order.sender.username,
                totalQty: order.cart.totalQty,
                totalPrice: formatMoney(order.cart.totalPrice)
              };
            });
            // const newOrders = {
            //   orders,
            //   cartTotal
            // };
            // console.log(newOrders);
            res.render("docket/view", {
              docket,
              orders,
              cartTotal,
              success: req.flash("success"),
              error: req.flash("error")
            });
            // res.status(200).json(newOrders);
          });
      } else {
        throw "An error occurred";
      }
    })
    .catch(err => {
      req.flash("error", "Could not find that docket");
      res.redirect("/dockets");
    });
};
