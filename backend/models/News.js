const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  author: { type: String, default: 'University Admin' }
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
