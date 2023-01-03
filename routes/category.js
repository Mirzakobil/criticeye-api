const express = require('express');
const router = express.Router();

const Category = require('../models/category');

router.post('/category/create', async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
    });
    return res.status(202).json(category);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/category/getOne/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    return res.status(202).json(category);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/category/getall', async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(202).json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put('/category/update', async (req, res) => {
  await Category.findByIdAndUpdate(
    req.body.categoryId,
    { name: req.body.name }
    // (error, data) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(data);
    //   }
    // }
  );
  res.send('category has been updated');
});

router.delete('/category/delete/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;
  await Category.findByIdAndRemove(categoryId);
  res.send('category deleted');
});

module.exports = router;
