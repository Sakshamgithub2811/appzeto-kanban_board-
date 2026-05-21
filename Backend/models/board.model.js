const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: String,
  createdBy: String,
  members: [String]
}, { timestamps: true });

module.exports = mongoose.model("Board", boardSchema);