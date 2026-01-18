const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,
  github: String,
  linkedin: String,
  portfolio: String
});

module.exports = mongoose.model("Profile", ProfileSchema);
