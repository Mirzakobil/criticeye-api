const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  resourceType: String,
  resourcePhotoLink: {
    type: String,
  },
  grade: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Resource', resourceSchema);
