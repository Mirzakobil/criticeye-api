const express = require('express');

const router = express.Router();

const Review = require('../models/reviews');
const Resource = require('../models/resources');
// router.post('/api/review/createTest', async (req, res) => {
//   const resourceId = req.body.resourceId;
//   const result = await Review.find({ resourceId });
//   const resource = await Resource.findById(resourceId);
//   const avr = result.reduce((acc, item) => item.grade + acc, 0) / result.length;
//   resource.grade = avr;
//   await resource.save();
//   console.log(resource.grade);
//   console.log(resourceId);

//   console.log(avr);
//   return res.status(202);
// });
router.post('/api/review/create', async (req, res) => {
  try {
    const review = await Review.create({
      userId: req.body.userId,
      resourceId: req.body.resourceId,
      reviewPhotoLink: req.body.reviewPhotoLink,
      name: req.body.name,
      reviewBody: req.body.reviewBody,
      grade: req.body.grade,
      tags: req.body.tags,
    });
    const resourceId = review.resourceId;
    const allResourceReviews = await Review.find({ resourceId });
    const resource = await Resource.findById(resourceId);
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

router.get('/api/review/getall/:resourceId', async (req, res) => {
  try {
    const resourceId = req.params.resourceId;
    const reviews = await Review.find({ resourceId });
    return res.status(202).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/api/review/getall/', async (req, res) => {
  try {
    const reviews = await Review.find();
    return res.status(202).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/api/review/tag/:tagId', async (req, res) => {
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
