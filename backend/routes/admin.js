const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const auth = require('../middleware/auth');

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

router.post('/candidates', [auth, isAdmin], async (req, res) => {
  try {
    const { name, position, description, imageUrl } = req.body;
    const candidate = new Candidate({ name, position, description, imageUrl });
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/candidates/:id', [auth, isAdmin], async (req, res) => {
  try {
    const { name, position, description, imageUrl } = req.body;
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id, 
      { name, position, description, imageUrl },
      { new: true }
    );
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/candidates/:id', [auth, isAdmin], async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    await candidate.deleteOne();
    res.json({ message: 'Candidate removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
