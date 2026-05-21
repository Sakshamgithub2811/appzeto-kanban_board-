const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board"
  },
  title: String,
  description: String,
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  dueDate: Date,
  assignedTo: String,
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Review", "Done"],
    default: "Todo"
  },
  position: Number
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);