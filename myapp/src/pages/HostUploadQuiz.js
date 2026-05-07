import { useState } from "react";

function HostUploadQuiz() {
  // SINGLE INPUT
  const [question, setQuestion] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [opt4, setOpt4] = useState("");
  const [answer, setAnswer] = useState("");

  // 🔥 BULK INPUT
  const [bulkText, setBulkText] = useState("");

  // SINGLE SAVE
  const saveQuiz = () => {
    if (!question || !opt1 || !opt2 || !opt3 || !opt4 || !answer) {
      alert("Fill all fields");
      return;
    }

    const quiz = JSON.parse(localStorage.getItem("quiz")) || [];

    quiz.push({
      question,
      options: [opt1, opt2, opt3, opt4],
      answer
    });

    localStorage.setItem("quiz", JSON.stringify(quiz));

    alert("Quiz Added ✅");

    setQuestion("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
    setOpt4("");
    setAnswer("");
  };

  // 🔥 BULK UPLOAD FUNCTION
  const handleBulkUpload = () => {
    if (!bulkText) {
      alert("Paste questions first");
      return;
    }

    const quiz = JSON.parse(localStorage.getItem("quiz")) || [];

    const blocks = bulkText.split("\n\n"); // separate questions

    blocks.forEach((block) => {
      const lines = block.split("\n");

      const question = lines[0];
      const options = lines.slice(1, 5);
      const answer = lines[5];

      if (question && options.length === 4 && answer) {
        quiz.push({
          question,
          options,
          answer
        });
      }
    });

    localStorage.setItem("quiz", JSON.stringify(quiz));

    alert("Bulk Upload Success ✅");

    setBulkText("");
  };

  return (
    <div className="card">
      <h2>Upload Quiz</h2>

      {/* SINGLE QUESTION */}
      <h3>Single Question</h3>

      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {[opt1, opt2, opt3, opt4].map((opt, i) => (
        <label key={i}>
          <input
            type="radio"
            checked={answer === opt}
            onChange={() => setAnswer(opt)}
          />
          <input
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const val = e.target.value;
              if (i === 0) setOpt1(val);
              if (i === 1) setOpt2(val);
              if (i === 2) setOpt3(val);
              if (i === 3) setOpt4(val);
            }}
          />
        </label>
      ))}

      <button onClick={saveQuiz}>Save Single Question</button>

      <hr />

      {/* 🔥 BULK UPLOAD */}
      <h3>Bulk Upload (Paste Multiple Questions)</h3>

      <textarea
        placeholder={`Example:

What is React?
Library
Framework
Language
Tool
Library

What is HTML?
Markup
Language
Tool
Framework
Markup`}
        rows={10}
        value={bulkText}
        onChange={(e) => setBulkText(e.target.value)}
      />

      <button onClick={handleBulkUpload}>
        Upload Bulk Questions 🚀
      </button>
    </div>
  );
}

export default HostUploadQuiz;