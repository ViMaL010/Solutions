const express = require('express');
const Review = require('../models/review');

const ReviewRouter = express.Router();

ReviewRouter.get('/', async (req, res) => {  
    try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

ReviewRouter.post('/', async (req, res) => { 
    const { bookId, userId, rating, comment } = req.body;
    try {
      const review = new Review({ bookId, userId, rating, comment });
      await review.save();
      res.status(201).json(review);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
})


module.exports = {
    ReviewRouter
}