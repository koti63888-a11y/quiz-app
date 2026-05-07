import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadQuiz from "./pages/UploadQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* REGISTER */}
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* HOST PAGE */}
        <Route path="/upload" element={<UploadQuiz />} />

        {/* USER QUIZ PAGE */}
        <Route path="/quiz" element={<TakeQuiz />} />

        {/* 🏆 SCOREBOARD */}
        <Route path="/results" element={<Results />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;