import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const register = async () => {
    const res = await fetch("https://quiz-backend-snmo.onrender.com/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password, role })
    });

    alert(await res.text());
    navigate("/");
  };

  return (
    <div className="card">
      <h2>Register</h2>

      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={e => setPassword(e.target.value)} placeholder="Password" />

      <select onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="host">Host</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;