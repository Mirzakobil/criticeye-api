const express = require('express');
const router = express.Router();

const Resource = require('../models/resources');
const Rating = require('../models/rating');
const Review = require('../models/reviews');
const Category = require('../models/category');

//create resource
router.post('/api/resource/create', async (req, res) => {
  try {
    const categoryId = req.body.categoryId;
    const category = await Category.findById(categoryId);
    const resource = await Resource.create({
      name: req.body.name,
      category: category.name,
      categoryId: categoryId,
      resourcePhotoLink: req.body.resourcePhotoLink,
    });
    console.log(category);
    return res.status(202).json(resource);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put('/resource/update', async (req, res) => {
  await Resource.findByIdAndUpdate(
    req.body.resourceId,
    {
      name: req.body.name,
      resourcePhotoLink: req.body.resourcePhotoLink,
      categoryId: req.body.categoryId,
    }
    // (error, data) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(data);
    //   }
    // }
  );
  res.send('resource has been updated');
});

router.delete('/resource/delete/', async (req, res) => {
  const ids = req.body.resourceIds;
  for (id of ids) {
    await Resource.findByIdAndRemove(id);
  }

  res.send('Resource deleted');
});

router.get('/resource/getOne/:resourceId', async (req, res) => {
  try {
    const resourceId = req.params.resourceId;
    const resource = await Resource.findById(resourceId);
    return res.status(202).json(resource);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all resource ratings
router.get('/rating/getall/resource/:resourceId', async (req, res) => {
  try {
    const resourceId = req.params.resourceId;
    const ratings = await Rating.find({ resourceId });
    return res.status(202).json(ratings);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/resource/getall', async (req, res) => {
  try {
    const resources = await Resource.find();
    return res.status(202).json(resources);
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
      return res.status(400).json('Resource already rated by current User');
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
