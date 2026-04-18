const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const User = require('../models/User');
const Vote = require('../models/Vote');
const auth = require('../middleware/auth');

router.get('/results', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/candidates', auth, async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ position: 1, votes: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { candidateId } = req.body;
    
    const user = await User.findById(req.user.id);
    if (user.hasVoted) {
      return res.status(400).json({ message: 'You have already voted' });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const vote = new Vote({ user: req.user.id, candidate: candidateId });
    await vote.save();

    candidate.votes += 1;
    await candidate.save();

    user.hasVoted = true;
    await user.save();

    res.json({ message: 'Vote submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
