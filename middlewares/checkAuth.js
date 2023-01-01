const auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(409).send({ message: 'Yooooo' });
  } else next();
};
module.exports = auth;
