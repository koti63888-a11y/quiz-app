import { useEffect, useState } from "react";

function TakeQuiz() {
  const API_URL = "https://quiz-backend-snmo.onrender.com";

  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/quizzes`)
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
  }, []);

  const startQuiz = async (quizId) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/quiz/${quizId}`);
    const data = await res.json();

    setLoading(false);

    if (data.success) {
      setSelectedQuiz(data.quiz);
    } else {
      alert(data.message);
    }
  };

  const selectAnswer = (qIndex, answer) => {
    setAnswers({
      ...answers,
      [qIndex]: answer,
    });
  };

  const submitQuiz = async () => {
    let score = 0;

    selectedQuiz.questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });

    const email = localStorage.getItem("user");

    await fetch(`${API_URL}/save-result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        score,
        total: selectedQuiz.questions.length,
        quizTitle: selectedQuiz.title,
      }),
    });

    alert(`Your Score: ${score}/${selectedQuiz.questions.length}`);
  };

  if (loading) {
    return (
      <div className="center-container">
        <h2>Loading quiz...</h2>
      </div>
    );
  }

  if (!selectedQuiz) {
    return (
      <div className="dashboard">
        <h2>Available Quizzes</h2>

        {quizzes.map((quiz) => (
          <div className="question-box" key={quiz._id}>
            <h3>{quiz.title}</h3>
            <p>Questions: {quiz.questionCount}</p>

            {quiz.isPaid ? (
              <p>Premium Quiz ₹{quiz.price}</p>
            ) : (
              <p>Free Quiz</p>
            )}

            <button onClick={() => startQuiz(quiz._id)}>
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="quiz-card">
      <h2>{selectedQuiz.title}</h2>

      {selectedQuiz.questions.map((q, qIndex) => (
        <div className="question-box" key={qIndex}>
          <h3>
            {qIndex + 1}. {q.question}
          </h3>

          {q.options.map((option, oIndex) => (
            <label className="option-card" key={oIndex}>
              <input
                type="radio"
                name={`question-${qIndex}`}
                onChange={() => selectAnswer(qIndex, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <button className="submit-btn" onClick={submitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
}

export default TakeQuiz;