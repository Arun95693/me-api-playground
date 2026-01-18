require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// connect database
connectDB();

// ✅ HEALTH ROUTE (THIS IS WHAT IS MISSING)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


// test root (optional but helpful)
app.get("/", (req, res) => {
  res.send("Me-API backend is running");
});

// routes
const Profile = require("./models/Profile");
const Project = require("./models/Project");

app.get("/profile", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

app.get("/projects", async (req, res) => {
  const skill = req.query.skill || "";
  const projects = await Project.find({
    skills: { $regex: skill, $options: "i" },
  });
  res.json(projects);
});

// ✅ IMPORTANT: Render port binding
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
