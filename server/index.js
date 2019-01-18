const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

const app = express();

passport.use(new GithubStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
