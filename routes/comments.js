const express = require('express');

const router = express.Router();
const Comment = require('../models/comments');
const Review = require('../models/reviews');
const User = require('../models/users');

//review comment create
router.post('/api/review/comment', async (req, res) => {
  try {
    const userId = req.body.userId;
    const reviewId = req.body.reviewId;
    const author = await User.findById(userId);
    const resource = await Review.findById(reviewId);
    console.log(author);
    const comment = await Comment.create({
      userId: userId,
      reviewId: reviewId,
      comment: req.body.comment,
      authorName: author.firstName,
      resourceName: resource.resourceName,
    });

    return res.status(202).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all user's comments
router.get('/api/comment/getall/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const comments = await Comment.find({ userId: userId });
    return res.status(202).json(comments);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all review comments
router.get('/api/comment/getall/review/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const comment = await Comment.find({ reviewId });
    return res.status(202).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all comments
router.get('/api/comment/getall/', async (req, res) => {
  try {
    const comment = await Comment.find();
    return res.status(202).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put('/comment/update', async (req, res) => {
  await Comment.findByIdAndUpdate(
    req.body.commentId,
    { comment: req.body.comment }
    // (error, data) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(data);
    //   }
    // }
  );
  res.send('comment has been updated');
});

router.delete('/comment/delete/', async (req, res) => {
  const ids = req.body.commentIds;
  for (id of ids) {
    await Comment.findByIdAndRemove(id);
  }

  res.send('comment deleted');
});

module.exports = router;
