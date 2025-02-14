const express = require('express');
const Review = require('../models/review');

const ReviewRouter = express.Router();

// Get reviews for a specific book (Query parameter instead of URL parameter)
ReviewRouter.get('/', async (req, res) => {  
  try {
    const { bookId } = req.query;  // Use query parameter for bookId
    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required." });
    }
    
    const reviews = await Review.find({ bookId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new review for a book
ReviewRouter.post('/', async (req, res) => { 
  const { bookId, userId, rating, comment } = req.body;

  // Validate the request body
  if (!bookId || !userId || !rating || !comment) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Ensure rating is between 1 and 5
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }

  try {
    const review = new Review({ bookId, userId, rating, comment });
    await review.save();
    res.status(201).json(review); // Return the newly created review
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {
  ReviewRouter
};
