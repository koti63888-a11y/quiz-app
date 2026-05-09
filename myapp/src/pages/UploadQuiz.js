import { useState } from "react";
import FloatingMenu from "../components/FloatingMenu";

function UploadQuiz() {
  const [bulk, setBulk] = useState("");

  const uploadBulk = async () => {
    const questions = bulk.split("\n\n");

    for (let q of questions) {
      const lines = q.split("\n");

      if (lines.length < 6) continue;

      const data = {
        question: lines[0],
        options: [lines[1], lines[2], lines[3], lines[4]],
        answer: lines[5]
      };

      await fetch("https://quiz-backend-snmo.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    }

    alert("Uploaded ✅");
    setBulk("");
  };

  return (
    <>
      <FloatingMenu />

      <div className="center-container">
        <div className="card" style={{ width: "500px" }}>
          <h2>Upload Quiz 🚀</h2>

          <textarea
            rows="15"
            value={bulk}
            onChange={(e) => setBulk(e.target.value)}
            placeholder={`Question
Option1
Option2
Option3
Option4
Answer

(blank line)

Next question...`}
          />

          <button onClick={uploadBulk}>
            Upload All
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadQuiz;