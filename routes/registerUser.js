const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/users');

router.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePhotoLink: req.body.profilePhotoLink,
      role: req.body.role,
      status: req.body.status,
    });
    return res.status(202).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
