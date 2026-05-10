import { useEffect, useState } from "react";
import FloatingMenu from "../components/FloatingMenu";

function Results() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://quiz-backend-snmo.onrender.com")
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  return (
    <>
      <FloatingMenu />

      <div className="center-container">
        <div className="quiz-card">
          <h2>🏆 Score Board</h2>

          {data.map((r, i) => (
            <div key={i} className="question-box">
              <h3>{r.email}</h3>

              <p>
                Score: {r.score} / {r.total}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Results;