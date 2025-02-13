const express = require('express');
const authRouter = express.Router();
const { signup, login, authenticateToken, checkAdmin } = require("./auth");

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get('/profile', authenticateToken, (req, res) => {
    // Send user info (this route could require login to access)
    res.json({ userId: req.user._id });
});

// Admin only route (protected by both token and admin check)
authRouter.get('/admin', authenticateToken, checkAdmin, (req, res) => {
    res.json({ message: 'Welcome Admin' });
});

module.exports = authRouter;