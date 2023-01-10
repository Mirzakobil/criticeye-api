const express = require('express');
const router = express.Router();

const Tags = require('../models/tags');
const Review = require('../models/reviews');

router.post('/api/tags/create', async (req, res) => {
  try {
    const tag = await Tags.create({
      name: req.body.name,
    });
    return res.status(202).json(tag);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all tags
router.get('/tags/getall/', async (req, res) => {
  try {
    const tags = await Tags.find();
    return res.status(202).json(tags);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get one tag by id
router.get('/tag/:tagId', async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const tag = await Tags.findById(tagId);

    return res.status(202).json(tag);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all tag reviews
router.get('/api/review/getall/tag/:tagId', async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const reviews = await Review.find({ tagId: tagId });
    return res.status(202).json(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put('/tag/update', async (req, res) => {
  await Tags.findByIdAndUpdate(
    req.body.tagId,
    { name: req.body.name }
    // (error, data) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(data);
    //   }
    // }
  );
  res.send('tag has been updated');
});

router.delete('/tag/delete/:tagId', async (req, res) => {
  const tagId = req.params.tagId;
  await Tags.findByIdAndRemove(tagId);
  res.send('tag deleted');
});

module.exports = router;
