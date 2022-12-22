const mongoose = require('mongoose');
const dbURL = process.env.MONGO_URL;
const db = mongoose.connect(
  dbURL,
  () => {
    console.log('Connected to database');
  },
  (err) => {
    console.log(err);
  },
  { useUnifiedTopology: true, useNewUrlParser: true }
);

module.exports = {
  db,
};
