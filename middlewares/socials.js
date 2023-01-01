// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GithubStrategy = require('passport-github2').Strategy;

// googleCallback, githubCallBack

// const optsGoogle = {
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/google/callback',
// };

// const optsGitHub = {
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: '/github/callback',
// };

// passport.use(new GoogleStrategy(optsGoogle, googleCallback));
// passport.use(new GithubStrategy(optsGitHub, githubCallBack));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// function auth(req, res, next) {
//   if (!req.isAuthenticated()) return res.status(401).json('Unauthorized user');
//   else next();
// }

// function admin(req, res, next) {
//   if (req.user.role !== 'admin')
//     return res.status(403).json('Unauthorized admin');
//   else next();
// }
