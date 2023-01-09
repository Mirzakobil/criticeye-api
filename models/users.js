const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    githubId: {
      type: String,
    },
    role: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    profilePhotoLink: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'user',
    },
    status: {
      type: String,
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
