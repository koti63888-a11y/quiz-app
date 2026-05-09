import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const API_URL = "https://quiz-backend-snmo.onrender.com/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          role
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Registered Successfully ✅");
        navigate("/");
      } else {
        alert(data.message || "Register failed ❌");
      }
    } catch (err) {
      alert("Server error ❌");
      console.log(err);
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Register</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="host">Host</option>
        </select>

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;