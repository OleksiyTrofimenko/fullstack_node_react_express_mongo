const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('../config/keys');

const User = mongoose.model('users');

// https://cl.ly/6ae2207928b9
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Hey app gimme google auth functionality
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true, // Relevant for issue with http and https redirection
    },
    (accessToken, refreshToken, profile, done) => {
      // Check if user might be already added to DB ( Promise )
      User.find({ googleId: profile.id }).then((user) => {
        if (user) {
          // we already have a record with a given profile id
          done(null, user);
        } else {
          // we don't have a user, so record this id and make a new record
        }
      });

      // save() save information in mongoDB
      new User({ googleId: profile.id }).save().then((user) => {
        done(null, user);
      });
    }
  )
);

// https://console.developers.google.com/
