import Docket from "../models/docket";

exports.new = (req, res) => {
  res.render("docket_new");
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
        title: "Dockets"
      });
      // console.log(docket);
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
