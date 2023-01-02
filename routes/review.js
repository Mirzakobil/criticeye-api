const express = require('express');

const router = express.Router();

const Review = require('../models/reviews');
const Resource = require('../models/resources');
const Tags = require('../models/tags');
const Comment = require('../models/comments');

// const auth = require('../services/auth');
//const auth = require('../middlewares/auth');

//create review
router.post('/api/review/create', async (req, res) => {
  try {
    const resourceId = req.body.resourceId;
    const resource = await Resource.findById(resourceId);
    const tagsIds = req.body.tags;
    const tagsName = [];
    for (id of tagsIds) {
      const tagData = await Tags.findById(id);
      tagsName.push(tagData.name);
    }
    const review = await Review.create({
      authorId: req.body.authorId,
      resourceId: resourceId,
      reviewPhotoLink: req.body.reviewPhotoLink,
      name: req.body.name,
      resourceName: resource.name,
      category: resource.category,
      categoryId: resource.categoryId,
      reviewBody: req.body.reviewBody,
      grade: req.body.grade,
      tags: tagsName,
      tagId: tagsIds,
    });

    const allResourceReviews = await Review.find({ resourceId });

    resource.grade =
      allResourceReviews.reduce((acc, item) => item.grade + acc, 0) /
      allResourceReviews.length;

    await resource.save();

    return res.status(202).json(review);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//review like
router.post('/api/review/like', async (req, res) => {
  try {
    const userId = req.body.userId;
    const reviewId = req.body.reviewId;
    const review = await Review.findById(reviewId);
    const alreadyLiked = review.likesAll.find(
      (r) => r.userId.toString() === userId
    );

    if (alreadyLiked) {
      review.likes--;

      review.likesAll = review.likesAll.filter(
        (item) => item.userId.toString() !== userId
      );
    } else {
      review.likes++;
      const likeData = {
        userId,
      };

      review.likesAll.push(likeData);
    }

    await review.save();

    return res.status(202).json(review);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//review comment create
router.post('/api/review/comment', async (req, res) => {
  try {
    const userId = req.body.userId;
    const reviewId = req.body.reviewId;
    const comment = await Comment.create({
      userId: userId,
      reviewId: reviewId,
      comment: req.body.comment,
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

//get all resource reviews
router.get('/api/review/getall/resource/:resourceId', async (req, res) => {
  try {
    const resourceId = req.params.resourceId;
    const reviews = await Review.find({ resourceId });
    return res.status(202).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all user's reviews
router.get('/api/review/getall/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const reviews = await Review.find({ authorId: userId });
    return res.status(202).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all reviews
router.get('/api/review/getall/', async (req, res) => {
  try {
    const reviews = await Review.find();
    return res.status(202).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get one review by id
router.get('/review/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId);
    review.views++;
    review.save();
    return res.status(202).json(review);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all tag reviews
router.get('/api/review/getall/tag/:tagId', async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const reviews = await Review.find({ tags: tagId });
    return res.status(202).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
