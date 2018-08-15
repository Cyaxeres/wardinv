import User from "../models/user";
import bcrypt from "bcrypt-nodejs";

exports.home = (req, res) => {
  User.find({ role_id: { $gt: 0 } })
    .select("name mail role_id")
    .exec()
    .then(users => {
      res.render("user/index", {
        users: users,
        title: "Users",
        success: req.flash("success"),
        error: req.flash("error")
      });
    })
    .catch(err => {
      res.redirect("/users");
    });
};

exports.edit = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .select("name mail password pin role_id")
    .exec()
    .then(user => {
      res.render("user/new", { foundUser: user, title: "Edit User" });
    })
    .catch(err => {
      req.flash("error", "An error occured");
      res.redirect("/users");
    });
};

exports.update = (req, res) => {
  let updateDoc = req.body.foundUser;
  Object.keys(updateDoc).forEach(
    key => updateDoc[key] == "" && delete updateDoc[key]
  );
  if (updateDoc.password) {
    updateDoc.password = bcrypt.hashSync(
      updateDoc.password,
      bcrypt.genSaltSync(8),
      null
    );
  }
  if (updateDoc.pin) {
    updateDoc.pin = bcrypt.hashSync(updateDoc.pin, bcrypt.genSaltSync(8), null);
  }

  User.findByIdAndUpdate(req.params.id, { $set: updateDoc })
    .exec()
    .then(updatedDoc => {
      req.flash("success", "User has been updated");
      res.redirect("/users");
    })
    .catch(err => {
      req.flash("success", "Could not update user");
      res.redirect("/users");
    });
};
