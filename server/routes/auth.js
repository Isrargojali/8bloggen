// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate a JWT token
const generateAuthToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin || false }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware for protected routes
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// POST /signup
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    const token = generateAuthToken(newUser);
    res.status(201).json({
      token,
      message: 'User created successfully!',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar || "",
        isAdmin: newUser.isAdmin || false
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = generateAuthToken(user);
    res.json({
      token,
      message: 'Login successful!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
        isAdmin: user.isAdmin || false
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// GET /user - Get current user
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /user - Update user
router.put('/user', authMiddleware, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the new email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.id.toString()) {
        return res.status(400).json({ error: 'Email is already in use.' });
      }
    }

    const updates = { name, email };
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select('-password');

    res.json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// POST /admin/login - Admin login with secret key
router.post('/admin/login', async (req, res) => {
  const { email, password, adminKey } = req.body;
  const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY;

  if (!ADMIN_SECRET) {
    return res.status(500).json({ error: 'Admin functionality not configured' });
  }

  if (adminKey !== ADMIN_SECRET) {
    return res.status(403).json({ error: 'Invalid admin key' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    // Make user admin if not already
    if (!user.isAdmin) {
      user.isAdmin = true;
      await user.save();
    }

    const token = generateAuthToken(user);
    res.json({
      token,
      message: 'Admin login successful!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
        isAdmin: true
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;