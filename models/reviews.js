const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
  resourceName: {
    type: String,
    required: true,
  },
  resourceType: {
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
  ratingAll: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number },
    },
  ],
  ratingAvr: {
    type: Number,
    default: 0,
  },
  likesAll: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  tags: [
    {
      type: String,
    },
  ],
  tagId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
});

module.exports = mongoose.model('Review', reviewSchema);
