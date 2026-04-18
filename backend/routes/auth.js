const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, studentId, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    user = await User.findOne({ studentId });
    if (user) return res.status(400).json({ message: 'Student ID already registered' });

    user = new User({ name, studentId, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });
    
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, role: user.role, hasVoted: user.hasVoted } });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
