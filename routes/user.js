const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
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

router.put('/update', async (req, res) => {
  const userIds = req.body.ids;
  for (id of userIds) {
    await User.findByIdAndUpdate(
      id,
      {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePhotoLink: req.body.profilePhotoLink,
      }
      // (error, data) => {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(data);
      //   }
      // }
    );
  }
  res.send('admin has been demoted to user');
});

router.put('/block', async (req, res) => {
  const userIds = req.body.ids;
  for (id of userIds) {
    await User.findByIdAndUpdate(
      id,
      { status: 'blocked' }
      // (error, data) => {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(data);
      //   }
      // }
    );
  }
  res.send('users blocked');
});

router.put('/unblock', async (req, res) => {
  const userIds = req.body.ids;
  for (id of userIds) {
    await User.findByIdAndUpdate(
      id,
      { status: 'active' }
      // (error, data) => {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(data);
      //   }
      // }
    );
  }
  res.send('user unblocked');
});

router.put('/makeAdmin', async (req, res) => {
  const userIds = req.body.ids;
  for (id of userIds) {
    await User.findByIdAndUpdate(
      id,
      { role: 'admin' }
      //  (error, data) => {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(data);
      //   }
      // }
    );
  }
  res.send('user has been promoted to admin');
});

router.put('/makeUser', async (req, res) => {
  const userIds = req.body.ids;
  for (id of userIds) {
    await User.findByIdAndUpdate(
      id,
      { role: 'user' }
      // (error, data) => {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(data);
      //   }
      // }
    );
  }
  res.send('admin has been demoted to user');
});

router.delete('/delete', async (req, res) => {
  const userIds = req.body.ids;
  for (id of userIds) {
    await User.findByIdAndRemove(id);
  }
  res.send('user deleted');
});

router.get('/getall', async (req, res) => {
  try {
    const users = await User.find();
    return res.status(202).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
