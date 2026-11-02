const express = require('express');
const Competition = require('../models/Competition');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all competitions (Logged-in users)
router.get('/', verifyToken, async (req, res) => {
  try {
    const comps = await Competition.find().sort({ createdAt: -1 });
    res.json(comps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch competitions.' });
  }
});

// Create Competition (Admin Only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const newComp = new Competition(req.body);
    await newComp.save();
    res.status(201).json(newComp);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create competition.' });
  }
});

module.exports = router;