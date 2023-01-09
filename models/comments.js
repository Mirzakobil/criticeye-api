const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    authorName: {
      type: String,
      required: true,
    },
    resourceName: {
      type: String,
      required: true,
    },
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
