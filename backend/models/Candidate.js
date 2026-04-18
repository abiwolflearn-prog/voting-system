const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String },
  votes: { type: Number, default: 0 },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);
