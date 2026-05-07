import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="navbar">
        <h2>Quiz App</h2>
        <button className="menu-btn" onClick={() => setOpen(true)}>☰</button>
      </div>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

      {/* SIDEBAR */}
      <div className={`side-menu ${open ? "open" : ""}`}>
        
        <button className="close-btn" onClick={() => setOpen(false)}>✖</button>

        {/* Always show Login */}
        <Link to="/" onClick={() => setOpen(false)}>Login</Link>

        {/* Show only if logged in */}
        {user && (
          <>
            <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link to="/quiz" onClick={() => setOpen(false)}>Quiz</Link>
            <Link to="/results" onClick={() => setOpen(false)}>Results</Link>

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;