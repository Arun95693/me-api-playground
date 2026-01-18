const express = require("express");
const Profile = require("../models/Profile");
const router = express.Router();

router.get("/profile", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

router.post("/profile", async (req, res) => {
  await Profile.create(req.body);
  res.json({ message: "Profile created" });
});

module.exports = router;
