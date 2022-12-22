require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

const registerUser = require('./routes/registerUser');
const resource = require('./routes/resource');
const tag = require('./routes/tags');
const review = require('./routes/review');
require('./database');

const logger = (req, res, next) => {
  console.log(
    `${new Date().toString()} - ${req.method} ${req.path} ${req.originalUrl}`
  );
  next();
};
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(registerUser);
app.use(resource);
app.use(tag);
app.use(review);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
