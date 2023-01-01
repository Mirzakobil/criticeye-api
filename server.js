require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const session = require('express-session');

app.use(
  session({
    secret: 'somethingsecretgoeshere',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
const PORT = process.env.PORT || 5000;

const registerUser = require('./routes/registerUser');
const resource = require('./routes/resource');
const tag = require('./routes/tags');
const review = require('./routes/review');
const logIn = require('./routes/login');
require('./database');
const auth = require('./middlewares/auth');
const logger = (req, res, next) => {
  console.log(
    `${new Date().toString()} - ${req.method} ${req.path} ${req.originalUrl}`
  );
  next();
};

app.use(logger);
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logIn);
app.use(registerUser);
app.use(resource);
app.use(tag);
app.use('/rev', review);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
