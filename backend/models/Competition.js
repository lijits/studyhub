const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Chess Contest, Online Singing, Coding Sprint
  description: { type: String, required: true },
  reward: { type: String, required: true },
  eventDate: { type: String, required: true },
  status: { type: String, enum: ['Upcoming', 'Live', 'Completed'], default: 'Upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('Competition', competitionSchema);