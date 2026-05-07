import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FloatingMenu() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role")?.trim().toLowerCase();

  console.log("ROLE:", role);

  return (
    <>
      <button
        className="floating-btn"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {open && (
        <div className="popup-menu">

          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          {/* USER */}
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

          {/* HOST */}
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

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout 🚪
          </button>

        </div>
      )}
    </>
  );
}

export default FloatingMenu;