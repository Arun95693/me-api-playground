const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

router.get("/projects", async (req, res) => {
  const skill = req.query.skill || "";
  const projects = await Project.find({
    skills: { $regex: skill, $options: "i" }
  });
  res.json(projects);
});

module.exports = router;
