const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ms = require('ms');

const data = require('../services/userData');

router.get('/login/success', (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
    });
  }
});
router.post('/api/login', async (req, res) => {
  const user = await data.loginUser(req.body.email, req.body.password);

  if (user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      token: `${token}`,
      expiresIn: ms(process.env.JWT_EXPIRES_IN),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    //console.log(req.user);
    res.redirect('http://localhost:3000/');
  }
);
router.get(
  '/github',
  passport.authenticate('github', { scope: ['profile', 'email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: 'http://localhost:3000/login',
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/');
  }
);
module.exports = router;
