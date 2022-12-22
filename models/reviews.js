const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
  reviewPhotoLink: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  reviewBody: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
});

module.exports = mongoose.model('Review', reviewSchema);
