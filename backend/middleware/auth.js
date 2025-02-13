const jwt = require('jsonwebtoken'); // Adjust the path as necessary
const User = require('../models/user');
const secretKey = 'HarshatMehta'; // Replace with your actual secret key

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified; // Store user info in the request
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

// Check if the user is an admin
const checkAdmin = async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "Access denied, admin only" });
    }
};

// User signup
const signup = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        // Check if user already exists
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(400).send('Email already exists');

        // Create new user
        const user = new User({
            name,
            email,
            password: password, // You might want to hash the password before saving it
            isAdmin
        });

        const savedUser = await user.save();

        // Generate token
        const token = jwt.sign({ _id: savedUser._id, isAdmin: savedUser.isAdmin }, secretKey, { expiresIn: '1h' });

        res.send({ user: savedUser, token }); // Send user details and the token
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// User login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email exists and passwords match
        const user = await User.findOne({ email });
        if (!user || user.password !== password) return res.status(400).send('Email or password is wrong');

        // Generate token
        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });

        // Send the token in Authorization header
        res.header('Authorization', token).send({ token , user: user._id });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = { authenticateToken, signup, login, checkAdmin };
