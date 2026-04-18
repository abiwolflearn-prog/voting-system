const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config(); // loads .env automatically
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/voting-system')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const voteRoutes = require('./routes/vote');
const newsRoutes = require('./routes/news');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/news', newsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
