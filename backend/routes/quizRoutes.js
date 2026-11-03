const express = require('express');
const Quiz = require('../models/Quiz');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all quizzes (Protected: Requires Login)
router.get('/', verifyToken, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quizzes.' });
  }
});

// Get single quiz by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Error loading quiz.' });
  }
});

// Create Quiz (Admin Only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create quiz.' });
  }
});

// Update Quiz & Questions (Admin Only)
// PUT route to update quiz details and its questions array
router.put('/:id', async (req, res) => {
  try {
    const { title, level, category, questions } = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, level, category, questions }, // <-- Ensure questions array is included here
      { new: true, runValidators: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(updatedQuiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Quiz (Admin Only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quiz deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete quiz.' });
  }
});

module.exports = router;