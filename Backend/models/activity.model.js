const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    message: String,
    action: String,
    user: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);