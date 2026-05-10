const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); 

/* =========================
   MONGODB ATLAS CONNECTION
========================= */

mongoose.connect(
  "mongodb+srv://koti:Koti9900@cluster0.nvfxzfa.mongodb.net/quizapp?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("MongoDB Atlas Connected ✅");
})
.catch((err) => {
  console.log(err);
});

/* =========================
   USER SCHEMA
========================= */

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", UserSchema);

/* =========================
   QUIZ SCHEMA
========================= */

const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});

const Quiz = mongoose.model("Quiz", QuizSchema);

/* =========================
   RESULT SCHEMA
========================= */

const ResultSchema = new mongoose.Schema({
  email: String,
  score: Number,
  total: Number,
});

const Result = mongoose.model("Result", ResultSchema);

/* =========================
   REGISTER API
========================= */

app.post("/register", async (req, res) => {
  try {
    console.log("📥 DATA RECEIVED:", req.body);

    const user = new User(req.body);

    await user.save();

    console.log("✅ Saved to MongoDB");

    res.json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      message: "Server Error",
    });
  }
});

/* =========================
   LOGIN API
========================= */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      password,
    });

    if (user) {
      res.json({
        success: true,
        role: user.role,
        email: user.email,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Login",
      });
    }
  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      message: "Server Error",
    });
  }
});

/* =========================
   UPLOAD QUIZ API
========================= */

app.post("/upload-quiz", async (req, res) => {
  try {
    const quiz = new Quiz(req.body);

    await quiz.save();

    res.json({
      success: true,
      message: "Quiz Uploaded Successfully",
    });
  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      message: "Upload Failed",
    });
  }
});

/* =========================
   GET QUIZZES API
========================= */

app.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();

    res.json(quizzes);
  } catch (err) {
    console.log(err);
  }
});

/* =========================
   SAVE RESULT API
========================= */

app.post("/save-result", async (req, res) => {
  try {
    const result = new Result(req.body);

    await result.save();

    res.json({
      success: true,
      message: "Result Saved",
    });
  } catch (err) {
    console.log(err);
  }
});

/* =========================
   GET RESULTS API
========================= */

app.get("/results", async (req, res) => {
  try {
    const results = await Result.find();

    res.json(results);
  } catch (err) {
    console.log(err);
  }
});

/* =========================
   SERVER
========================= */

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});