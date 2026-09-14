import { useState, useEffect } from 'react';

function QuizPage({ quizId }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/quiz/${quizId}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setQuiz(data))
      .catch(err => console.error('Fetch failed:', err));
  }, [quizId]);

  const handleSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    const submittedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer
    }));

    const res = await fetch(`${import.meta.env.VITE_API_URL}/attempt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId: quiz._id, submittedAnswers })
    });
    const result = await res.json();
    alert(`Your Score is : ${result.scorePercent}%`);
  };

  return (
    <div>
      {!quiz ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3 className="main">⭐Test Your Knowledge</h3>
          {quiz.questions.map((q, index) => (
  <div key={q._id} className="question-card">
    <p className="question-text">
      <span className="question-number">{index + 1}</span>
      {q.questionText}
    </p>
    <div className="options-list">
      {q.options.map(opt => (
        <button
          key={opt}
          onClick={() => handleSelect(q._id, opt)}
          className={`option-btn ${answers[q._id] === opt ? 'selected' : ''}`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
))}
          <button onClick={handleSubmit} className="submitbtn">Submit Quiz</button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;