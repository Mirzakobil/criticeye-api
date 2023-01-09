const User = require('./models/users');
const jwt = require('jsonwebtoken');

const jwtCallback = async (jwt_payload, done) => {
  const user = await User.findOne({ email: jwt_payload.email });
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};
const googleCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const obj = await User.findOne({ email: profile.emails[0].value });
    if (!obj) {
      // create new user
      const newUser = new User({
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profilePhotoLink: profile.photos[0].value,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      done(null, newUser, { message: 'Auth successful', token });
    } else {
      // login existing user
      const token = jwt.sign(
        {
          id: obj._id,
          email: obj.email,
          role: obj.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      done(null, obj, { message: 'Auth successful', token });
    }
  } catch (err) {
    console.error(err);
    done(err, false, { message: 'Internal server error' });
  }
};
const githubCallBack = async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  try {
    const obj = await User.findOne({ githubId: profile.id });
    if (!obj) {
      // create new user
      const newUser = new User({
        githubId: profile.id,
        firstName: profile.username,
        profilePhotoLink: profile.photos[0].value,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      done(null, newUser, { message: 'Auth successful', token });
    } else {
      // login existing user
      const token = jwt.sign(
        {
          id: obj._id,
          email: obj.email,
          role: obj.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      done(null, obj, { message: 'Auth successful', token });
    }
  } catch (err) {
    console.error(err);
    done(err, false, { message: 'Internal server error' });
  }
};
module.exports = {
  jwtCallback,
  googleCallback,
  githubCallBack,
};
