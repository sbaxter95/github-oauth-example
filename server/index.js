const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const keys = require('./config/keys');
const session = require('express-session');

const app = express();
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: '/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
      return done(null, profile);
    }
  )
);

app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  (req, res) => {
    res.redirect('/authenticated');
  }
);

app.get('/authenticated', (req, res) => {
  res.send('Authenticated');
});

app.get('/error', (req, res) => {
  res.send('error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
