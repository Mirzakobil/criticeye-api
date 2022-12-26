const express = require('express');
const router = express.Router();

const Resource = require('../models/resources');
const Rating = require('../models/rating');
const Review = require('../models/reviews');

//create resource
router.post('/api/resource/create', async (req, res) => {
  try {
    const resource = await Resource.create({
      name: req.body.name,
      resourceType: req.body.resourceType,
      resourcePhotoLink: req.body.resourcePhotoLink,
    });
    return res.status(202).json(resource);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//resource rating by user
router.post('/api/resource/addUserRating', async (req, res) => {
  try {
    const resourceId = req.body.resourceId;
    const userId = req.body.userId;
    const rating = req.body.rating;
    const reviewId = req.body.reviewId;
    const resource = await Resource.findById(resourceId);
    const ratings = await Rating.find();
    const alreadyRatedUserId = ratings.find(
      (r) => r.userId.toString() === userId
    );

    const alreadyRatedResourceId = ratings.find(
      (r) => r.resourceId.toString() === resourceId
    );

    if (alreadyRatedResourceId && alreadyRatedUserId) {
      return res.status(400).json('Resource alredy rated by current User');
    }
    const ratingData = await Rating.create({
      userId: userId,
      resourceId: resourceId,
      reviewId: reviewId,
      rating: rating,
    });
    const review = await Review.findById(reviewId);
    const allResourceRatings = await Rating.find({ resourceId });
    const avrRating =
      allResourceRatings.reduce((acc, item) => item.rating + acc, 0) /
      allResourceRatings.length;
    resource.rating = avrRating;
    review.ratingAvr = avrRating;
    const revRating = {
      userId,
      rating,
    };

    review.ratingAll.push(revRating);

    await resource.save();
    await review.save();
    return res.status(202).json(ratingData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
