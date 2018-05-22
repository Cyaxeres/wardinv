import bodyParser from 'body-parser';
import flash from 'connect-flash';

import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';

/***************Mongodb configuratrion********************/
import configDB from './config/database.js';
mongoose.connect(configDB.url); // connect to our database

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, './app/views/'));
app.set('view engine', 'pug');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/')));

app.use(session({
  secret: 'wholoveskeylimepi3', //session secret
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'nooot',
  resave: false, 
  saveUninitialized: false}));
  app.use(flash()); // use connect-flash for flash messages stored in session
  
//Passport Things
require('./config/auth')(passport); // pass passport for configuration

// routes ======================================================================
require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('This page doesn\'t exist!');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 400)
    .render('error', {
      message: err.message
    });
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
