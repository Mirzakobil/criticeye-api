const express = require('express');
const router = express.Router();

const Tags = require('../models/tags');

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

module.exports = router;
