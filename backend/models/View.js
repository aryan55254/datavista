// models/View.js
const mongoose = require("mongoose");

const ViewSchema = new mongoose.Schema({
  url: String,
  referrer: String,
  userAgent: String,
  ip: String,
  sessionId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("View", ViewSchema);
