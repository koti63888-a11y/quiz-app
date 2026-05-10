const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://koti:Koti9900@cluster0.nvfxzfa.mongodb.net/quizapp?retryWrites=true&w=majority&appName=Cluster0",
  { serverSelectionTimeoutMS: 5000 }
)
.then(() => console.log("MongoDB Atlas Connected ✅"))
.catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const QuizSchema = new mongoose.Schema({
  title: String,
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  questions: [
    {
      question: String,
      options: [String],
      answer: String,
    },
  ],
});

const ResultSchema = new mongoose.Schema({
  email: String,
  score: Number,
  total: Number,
  quizTitle: String,
});

UserSchema.index({ email: 1 });
QuizSchema.index({ title: 1 });
ResultSchema.index({ email: 1 });

const User = mongoose.model("User", UserSchema);
const Quiz = mongoose.model("Quiz", QuizSchema);
const Result = mongoose.model("Result", ResultSchema);

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.json({ success: true, message: "Registered Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.json({
        success: true,
        role: user.role,
        email: user.email,
      });
    } else {
      res.json({ success: false, message: "Invalid Login" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server Error" });
  }
});

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
    res.json({ success: false, message: "Upload Failed" });
  }
});

app.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .select("title isPaid price questions")
      .limit(50);

    const quizList = quizzes.map((quiz) => ({
      _id: quiz._id,
      title: quiz.title,
      isPaid: quiz.isPaid,
      price: quiz.price,
      questionCount: quiz.questions.length,
    }));

    res.json(quizList);
  } catch (err) {
    console.log(err);
    res.json([]);
  }
});

app.get("/quiz/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.json({ success: false, message: "Quiz not found" });
    }

    res.json({ success: true, quiz });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server Error" });
  }
});

app.get("/quiz/:id/question/:index", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.json({ success: false, message: "Quiz not found" });
    }

    const index = Number(req.params.index);
    const question = quiz.questions[index];

    if (!question) {
      return res.json({ success: false, message: "No question" });
    }

    res.json({
      success: true,
      title: quiz.title,
      questionCount: quiz.questions.length,
      question,
      index,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server Error" });
  }
});

app.post("/save-result", async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();

    res.json({ success: true, message: "Result Saved" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Result Save Failed" });
  }
});

app.get("/results", async (req, res) => {
  try {
    const results = await Result.find().limit(100);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.json([]);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});