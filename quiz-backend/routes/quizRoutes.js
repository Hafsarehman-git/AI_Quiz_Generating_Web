const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');

router.post('/quiz', async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/quiz/:id', async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
});

router.post('/attempt', async (req, res) => {
  const { quizId, submittedAnswers } = req.body;

  const quiz = await Quiz.findById(quizId);

  const answers = submittedAnswers.map(sub => {
    const question = quiz.questions.id(sub.questionId);
    const isCorrect = question.correctAnswer === sub.selectedAnswer;
    return {
      questionId: sub.questionId,
      selectedAnswer: sub.selectedAnswer,
      isCorrect,
      topic: question.topic
    };
  });

  const scorePercent = Math.round((answers.filter(a => a.isCorrect).length / answers.length) * 100);

  const attempt = await Attempt.create({ quizId, answers, scorePercent });
  res.status(201).json(attempt);
});

module.exports = router;