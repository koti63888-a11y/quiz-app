const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// DB
mongoose.connect("mongodb://127.0.0.1:27017/quizapp")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// MODELS
const User = mongoose.model("User", {
  email: String,
  password: String,
  role: String
});

const Quiz = mongoose.model("Quiz", {
  question: String,
  options: [String],
  answer: String
});

// 🆕 RESULT MODEL
const Result = mongoose.model("Result", {
  email: String,
  score: Number,
  total: Number
});

// REGISTER
app.post("/register", async (req, res) => {
  const exist = await User.findOne({ email: req.body.email });
  if (exist) return res.send("User exists ❗");

  const user = new User(req.body);
  await user.save();

  res.send("Registered ✅");
});

// LOGIN
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) res.json(user);
  else res.json("Invalid");
});

// ADD QUIZ
app.post("/add-quiz", async (req, res) => {
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.send("Quiz Added ✅");
});

// GET QUIZ
app.get("/quiz", async (req, res) => {
  const data = await Quiz.find();
  res.json(data);
});

// 🆕 SUBMIT QUIZ (CALCULATE SCORE)
app.post("/submit", async (req, res) => {
  const { email, answers } = req.body;

  const quiz = await Quiz.find();

  let score = 0;

  quiz.forEach((q, i) => {
    if (answers[i] === q.answer) {
      score++;
    }
  });

  const result = new Result({
    email,
    score,
    total: quiz.length
  });

  await result.save();

  res.json({ score, total: quiz.length });
});

// 🆕 GET RESULTS
app.get("/results", async (req, res) => {
  const data = await Result.find();
  res.json(data);
});

app.listen(5000, () => console.log("Server running 🚀"));