/* EXPRESS */
const { response } = require('express');
const express = require('express');
const app = express();
const session = require('express-session');
var mysql = require('mysql');
var registrasi = require('./middleware/auth');

app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.get('/', function(req, res) {
    res.render('pages/auth');
});

// const port = process.env.PORT || 3000;
// app.listen(port , () => console.log('App listening on port ' + port));

/* PASSPORT SETUP */

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));

app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

/* google auth */

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '637947220251-3kf7lrevcqvq56r66b8u0ambjkredpq1.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '39IIHBntgcoGuQrNYfC7QSI2';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {

    // fetch('./middleware/auth.js')
    //   .then(
    //     function(response) {
    //       if (response.status !== 200) {
    //         console.log('ada masalah' + response.status);
    //         return;
    //       }

    //       response.json().then(function(data) {
    //         console.log(data);
    //       });

    //     }
    //   )
    //     .catch(function(err){
    //       console.log('fetch error :-S', err);
    //     })
    // Successful authentication, redirect success.
    res.redirect('/success');
  });