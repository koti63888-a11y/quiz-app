import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log("LOGIN:", data);

    if (data !== "Invalid") {

      // 🔥 CLEAR OLD DATA FIRST
      localStorage.clear();

      // 🔥 SAVE NEW USER
      localStorage.setItem("user", data.email);
      localStorage.setItem("role", data.role);

      navigate("/dashboard");

    } else {
      alert("Invalid login ❌");
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>
          Login
        </button>

        <button onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;