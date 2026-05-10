import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const res = await fetch(
        "https://quiz-backend-snmo.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      console.log("LOGIN:", data);

      if (data.success) {

        // CLEAR OLD DATA
        localStorage.clear();

        // SAVE USER
        localStorage.setItem("user", data.email);
        localStorage.setItem("role", data.role);

        alert("Login Successful ✅");

        navigate("/dashboard");

      } else {

        alert(data.message || "Invalid login ❌");

      }

    } catch (err) {

      console.log(err);

      alert("Server Error ❌");

    }

  };

  return (
    <div className="center-container">

      <div className="card">

        <h2>Login</h2>

        <input
          type="email"
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