
const express = require('express');
const Quiz = require('../models/Quiz');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// GET ALL QUIZZES
router.get('/', verifyToken, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    console.error('Fetch quizzes error:', err);
    res.status(500).json({ message: 'Failed to fetch quizzes.' });
  }
});

// GET SINGLE QUIZ
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    res.status(200).json(quiz);
  } catch (err) {
    console.error('Get quiz error:', err);
    res.status(500).json({ message: 'Error loading quiz.' });
  }
});

// CREATE QUIZ - ADMIN ONLY
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();

    res.status(201).json(newQuiz);
  } catch (err) {
    console.error('Create quiz error:', err);
    res.status(400).json({
      message: 'Failed to create quiz.',
      error: err.message
    });
  }
});

// UPDATE QUIZ AND QUESTIONS - ADMIN ONLY
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, level, category, questions } = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          level,
          category,
          questions
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    res.status(200).json(updatedQuiz);
  } catch (err) {
    console.error('Update quiz error:', err);
    res.status(400).json({
      message: 'Failed to update quiz.',
      error: err.message
    });
  }
});

// DELETE QUIZ - ADMIN ONLY
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    res.status(200).json({
      message: 'Quiz deleted successfully.'
    });
  } catch (err) {
    console.error('Delete quiz error:', err);
    res.status(500).json({ message: 'Failed to delete quiz.' });
  }
});

module.exports = router;
