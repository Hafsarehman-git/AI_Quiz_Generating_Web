const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: mongoose.Schema.Types.ObjectId,
  selectedAnswer: String,
  isCorrect: Boolean,
  topic: String
});

const attemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  answers: [answerSchema],
  scorePercent: Number,
  attemptedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attempt', attemptSchema);