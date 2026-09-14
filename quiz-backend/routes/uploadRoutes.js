const express = require('express');
const router = express.Router();
const multer = require('multer');
const generateQuizFromText = require('../utils/generateQuiz');
const Quiz = require('../models/Quiz');
const upload = multer({ storage: multer.memoryStorage() }); 

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
     const { extractText, getDocumentProxy } = await import('unpdf'); 

    const pdfBuffer = req.file.buffer; 
    const pdf =  await getDocumentProxy(new Uint8Array(pdfBuffer));
    const { text } = await extractText(pdf, { mergePages: true });
    console.log('EXTRACTED TEXT PREVIEW:', text.slice(0, 300)); 
    
  
 const questions = await generateQuizFromText(text, 15);

    const quiz = await Quiz.create({
      sourceTitle: req.file.originalname,
      questions: questions
    });

    res.status(201).json(quiz);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process this PDF: ' + err.message });
  }
});

module.exports = router;

