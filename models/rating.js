const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
  reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Rating', ratingSchema);
