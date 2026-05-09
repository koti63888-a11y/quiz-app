import { useEffect, useState } from "react";
import FloatingMenu from "../components/FloatingMenu";

function TakeQuiz() {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/quiz")
      .then((res) => res.json())
      .then((data) => setQuiz(data));
  }, []);

  const selectAnswer = (qIndex, option) => {
    const newAns = [...answers];
    newAns[qIndex] = option;
    setAnswers(newAns);
  };

  const submitQuiz = async () => {
    const email = localStorage.getItem("user");

    const res = await fetch("https://quiz-backend-snmo.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, answers })
    });

    const data = await res.json();

    alert(`Score: ${data.score}/${data.total}`);
  };

  const labels = ["A", "B", "C", "D"];

  return (
    <>
      <FloatingMenu />

      <div className="center-container">
        <div className="quiz-card">
          <h2>Quiz 🎯</h2>

          {quiz.map((q, i) => (
            <div key={i} className="question-box">
              <h3>{i + 1}. {q.question}</h3>

              {q.options.map((opt, j) => (
                <label key={j} className="option-card">
                  <input
                    type="radio"
                    name={`q${i}`}
                    onChange={() => selectAnswer(i, opt)}
                  />

                  <div className="option-label">
                    {labels[j]}
                  </div>

                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ))}

          <button className="submit-btn" onClick={submitQuiz}>
            Submit Quiz
          </button>
        </div>
      </div>
    </>
  );
}

export default TakeQuiz;