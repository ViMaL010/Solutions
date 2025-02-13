const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Assuming User model is defined

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

userRouter.get('/:id', authenticateToken, async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while retrieving the user" });
  }
});

module.exports = userRouter;
