const User = require('../models/users');
const bcrypt = require('bcrypt');

async function getUserByEmail(e) {
  const user = await User.findOne({ email: e });
  return user;
}

async function loginUser(email, password) {
  const user = await getUserByEmail(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}

module.exports = {
  loginUser,
  getUserByEmail,
};
