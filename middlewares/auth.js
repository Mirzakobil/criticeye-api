const express = require('express');
require('dotenv').config();

const app = express();
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;

const { jwtCallback, googleCallback, githubCallBack } = require('../passport');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const optsGoogle = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/google/callback',
};

const optsGitHub = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/github/callback',
};
passport.use(new JwtStrategy(opts, jwtCallback));
passport.use(new GoogleStrategy(optsGoogle, googleCallback));
passport.use(new GithubStrategy(optsGitHub, githubCallBack));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
const auth = passport.authenticate('jwt', { session: false });
module.exports = auth;
