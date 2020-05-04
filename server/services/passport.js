const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const keys = require('../config/keys');

// Hey app gimme google auth functionality
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log({
        accessToken,
        refreshToken,
        profile,
      });
    }
  )
);

// https://console.developers.google.com/
