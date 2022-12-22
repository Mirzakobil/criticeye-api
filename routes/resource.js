const express = require('express');
const router = express.Router();

const Resource = require('../models/resources');

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

module.exports = router;
