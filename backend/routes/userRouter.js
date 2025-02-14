const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Assuming User model is defined

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'HarshatMehta'); // Replace with your secret key
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

const userRouter = express.Router();

// GET user profile by ID
userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while retrieving the user" });
  }
});

// PUT endpoint to update user details
userRouter.put('/:id', authenticateToken, async (req, res) => {
  const { name, email } = req.body;

  // Validate the input
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  try {

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }  // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser); // Send back the updated user info
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});

module.exports = userRouter;
