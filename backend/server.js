const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const adminRoutes = require('./routes/adminRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const Quiz = require('./models/Quiz');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/competitions', competitionRoutes);

// Database Connection & Initial Seeding
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    
    // Seed initial default quizzes if database is empty
    const count = await Quiz.countDocuments();
    if (count === 0) {
      await Quiz.insertMany([
        {
          title: 'General Knowledge Starter',
          level: 'Beginner',
          category: 'General',
          questions: [
            { questionText: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], correctAnswerIndex: 2 },
            { questionText: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswerIndex: 1 }
          ]
        },
        {
          title: 'JavaScript Mastery',
          level: 'Intermediate',
          category: 'Programming',
          questions: [
            { questionText: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'global', 'set'], correctAnswerIndex: 1 },
            { questionText: 'What does JSON stand for?', options: ['JavaScript Object Notation', 'Java Source Open Network', 'JS Online Node'], correctAnswerIndex: 0 }
          ]
        }
      ]);
      console.log('Initial default quizzes seeded!');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));