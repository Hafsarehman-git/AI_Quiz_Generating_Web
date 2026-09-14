const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateQuizFromText(extractedText, numQuestions = 10) {
  const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

  const prompt = `
Generate ${numQuestions} multiple-choice questions based on the text below.

IMPORTANT: Respond with ONLY valid JSON, no explanations, no markdown code blocks, no extra text.

Format exactly like this:
[
  {
    "questionText": "...",
    "options": ["...", "...", "...", "..."],
    "correctAnswer": "...",
    "topic": "..."
  }
]

Text:
${extractedText}
`;

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  let cleaned = rawText.trim();
  cleaned = cleaned.replace(/^```json\s*/, '').replace(/```$/, '');

  return JSON.parse(cleaned);
}

module.exports = generateQuizFromText;