const express = require("express");
const router = express.Router();

const {
  createTask,
  updateTask,
  moveTask,
  deleteTask
} = require("../controllers/task.controller");

router.post("/", createTask);
router.put("/:id", updateTask);
router.put("/:id/move", moveTask);
router.delete("/:id", deleteTask);

module.exports = router;