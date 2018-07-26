import bodyParser from "body-parser";
import flash from "connect-flash";
import methodOverride from "method-override";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import logger from "morgan";
import passport from "passport";
import path from "path";
import chalk from "chalk";

let mongoStore = require("connect-mongo")(session);

//Logging middleware with color options
export const morganMiddleware = logger(function(tokens, req, res) {
  return [
    chalk.hex("#ff4757")("🍄  Morgan: "),
    chalk.hex("#34ace0")(tokens.method(req, res)),
    chalk.hex("#ffb142")(tokens.status(req, res)),
    chalk.hex("#ff5252")(tokens.url(req, res)),
    chalk.hex("#2ed573")(tokens["response-time"](req, res) + " ms"),
    chalk.hex("#f78fb3")("@ " + tokens.date(req, res)),
    chalk.yellow(tokens["remote-addr"](req, res)),
    chalk.hex("#fffa65")("from " + tokens.referrer(req, res))
    // chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
  ].join(" ");
});

/***************Mongodb configuratrion********************/
import configDB from "./config/database.js";
mongoose.connect(
  configDB.url,
  { useNewUrlParser: true }
); // connect to our database

// import seedProd from "../src/app/models/seeders/product-seeder";
// seedProd();

const app = express();
app.disable("x-powered-by");
app.use(methodOverride("_method"));
app.use("/assets", express.static(path.join(__dirname, "../public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/"))
);
app.use(
  "/roboto",
  express.static(path.join(__dirname, "../node_modules/roboto-fontface/"))
);

app.use(morganMiddleware);
// View engine setup
app.set("views", path.join(__dirname, "./app/views/"));
app.set("view engine", "pug");

// app.use(logger('dev', {
//   skip: () => app.get('env') === 'test'
// }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(
  session({
    cookie: {
      maxAge: 2 * 60 * 60 * 1000
      // expires: false
    },
    secret: "kyr0Bl4ziK3n",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(flash()); // use connect-flash for flash messages stored in session

//Ensures the pages don't cache so flash messages don't reappear
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

//store session
app.use((req, res, next) => {
  res.locals = {
    session: req.session,
    user: req.session.user,
    backURL: req.header("Referer") || "/",
    path: req.path
  };
  next();
});

//Passport Things
require("./config/auth")(passport); // pass passport for configuration

// routes ======================================================================
require("./config/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("This page doesn't exist!");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 400).render("404", {
    message: err.message
  });
  next();
});

// app.use(function (req, res, next) {
//   res.status(404).render('404', {
//     title: "Sorry, page not found",
//     session: req.session
//   });
// });

// app.use(function (req, res, next) {
//   res.status(500).render('404', {
//     title: "Sorry, page not found"
//   });
// });

export default app;
