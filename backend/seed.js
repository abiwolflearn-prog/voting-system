const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/voting-system')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const seedDB = async () => {
  try {
    // Clear existing Admins to prevent plaintext password bugs
    await User.deleteMany({ role: 'admin' });

    // The User schema has a pre('save') hook that automatically hashes the password using bcrypt.
    // By passing a plaintext password here and calling .save(), we guarantee it's properly hashed.
    const admin = new User({
      name: 'System Administrator',
      studentId: 'ADMIN-001',
      email: 'admin@univote.edu',
      password: 'adminpassword123',
      role: 'admin',
      hasVoted: false
    });

    await admin.save();
    console.log('✅ Admin account seeded successfully!');
    console.log('Login Email: admin@univote.edu');
    console.log('Login Password: adminpassword123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
