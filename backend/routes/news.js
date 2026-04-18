const express = require('express');
const router = express.Router();
const News = require('../models/News');
const auth = require('../middleware/auth');

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

// GET all news - public
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST new news - admin only
router.post('/', [auth, isAdmin], async (req, res) => {
  try {
    const { title, content, imageUrl, author } = req.body;
    const newsItem = new News({ title, content, imageUrl, author });
    await newsItem.save();
    res.status(201).json(newsItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE news - admin only
router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: 'News not found' });
    await newsItem.deleteOne();
    res.json({ message: 'News deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
