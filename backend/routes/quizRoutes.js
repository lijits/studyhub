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
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedQuiz);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update quiz.' });
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