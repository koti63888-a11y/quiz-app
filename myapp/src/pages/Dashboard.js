import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FloatingMenu from "../components/FloatingMenu";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const role = localStorage.getItem("role");

  return (
    <>
      <FloatingMenu />

      <div className="dashboard">
        <h2>Dashboard 🚀</h2>

        {/* HOST ONLY */}
        {role === "host" && (
          <>
            <button onClick={() => navigate("/upload")}>
              Upload Quiz 📤
            </button>

            <button onClick={() => navigate("/results")}>
              View Results 🏆
            </button>
          </>
        )}

        {/* USER ONLY */}
        {role === "user" && (
          <>
            <button onClick={() => navigate("/quiz")}>
              Take Quiz 🎯
            </button>

            <button onClick={() => navigate("/results")}>
              My Results 🏆
            </button>
          </>
        )}

        <br />
        <br />

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout 🚪
        </button>
      </div>
    </>
  );
}

export default Dashboard;