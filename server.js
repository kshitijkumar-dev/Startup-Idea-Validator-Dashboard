const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "secret123"; // change later

// ---------------- DB ----------------
mongoose.connect("mongodb://127.0.0.1:27017/startupDB");

// ---------------- MODELS ----------------
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}, { timestamps: true });

const ideaSchema = new mongoose.Schema({
  title: String,
  desc: String,
  problem: String,
  category: String,
  difficulty: Number,
  market: String,
  votes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  visibility: { type: String, default: "active" },
  userId: String,
  expiresAt: Date,
  isArchived: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Idea = mongoose.model("Idea", ideaSchema);

// ---------------- AUTH MIDDLEWARE ----------------
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
}

// ---------------- AUTH ROUTES ----------------
app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hash });

  res.json(user);
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  res.json({ token });
});

// ---------------- IDEA ROUTES ----------------

// Create idea
app.post("/ideas", auth, async (req, res) => {
  const data = req.body;

  const idea = await Idea.create({
    ...data,
    userId: req.user.id,
    expiresAt: data.expiresAt || null
  });

  res.json(idea);
});

// Get all active ideas
app.get("/ideas", async (req, res) => {
  const now = new Date();

  // auto archive expired
  await Idea.updateMany(
    { expiresAt: { $lt: now } },
    { isArchived: true }
  );

  const ideas = await Idea.find({
    visibility: "active",
    isArchived: false
  });

  res.json(ideas);
});

// Get archived ideas
app.get("/ideas/archive", async (req, res) => {
  const ideas = await Idea.find({ isArchived: true });
  res.json(ideas);
});

// Get single idea (increase views)
app.get("/ideas/:id", async (req, res) => {
  const idea = await Idea.findById(req.params.id);
  idea.views += 1;
  await idea.save();

  res.json(idea);
});

// Edit idea
app.put("/ideas/:id", auth, async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (idea.userId !== req.user.id)
    return res.status(403).json({ msg: "Not allowed" });

  Object.assign(idea, req.body);
  await idea.save();

  res.json(idea);
});

// Delete idea
app.delete("/ideas/:id", auth, async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (idea.userId !== req.user.id)
    return res.status(403).json({ msg: "Not allowed" });

  await idea.deleteOne();
  res.json({ msg: "Deleted" });
});

// Upvote
app.post("/ideas/:id/upvote", async (req, res) => {
  const idea = await Idea.findById(req.params.id);
  idea.votes += 1;
  await idea.save();

  res.json(idea);
});

// Toggle visibility
app.post("/ideas/:id/visibility", auth, async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (idea.userId !== req.user.id)
    return res.status(403).json({ msg: "Not allowed" });

  idea.visibility = idea.visibility === "active" ? "hidden" : "active";
  await idea.save();

  res.json(idea);
});

// Trending (ranking)
app.get("/ideas/trending", async (req, res) => {
  const ideas = await Idea.find({ isArchived: false });

  const marketMap = { Low:1, Medium:2, High:3, "Very High":4 };

  const ranked = ideas.map(i => ({
    ...i.toObject(),
    score: (marketMap[i.market] * 2) + i.difficulty + i.votes
  }));

  ranked.sort((a,b) => b.score - a.score);

  res.json(ranked.slice(0, 5));
});

// ---------------- SERVER ----------------
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
