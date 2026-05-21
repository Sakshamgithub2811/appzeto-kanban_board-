const Task = require("../models/task.model");
const Activity = require("../models/activity.model");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    req.io.to(task.boardId.toString()).emit("task-created", task);
    const activity = await Activity.create({
      boardId: task.boardId,
      action: "CREATE_TASK",
      message: `${task.title} task created`,
      user: task.assignedTo,
    });

    req.io.to(task.boardId.toString()).emit("activity-created", activity);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task not created",
      error: error.message
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    req.io.to(task.boardId.toString()).emit("task-updated", task);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task not updated",
      error: error.message
    });
  }
};

exports.moveTask = async (req, res) => {
  try {
    const { status, position } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status, position },
      { new: true }
    );

    req.io.to(task.boardId.toString()).emit("task-moved", task);

    res.status(200).json({
      success: true,
      message: "Task moved successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task not moved",
      error: error.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    req.io.to(task.boardId.toString()).emit("task-deleted", task._id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      taskId: task._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task not deleted",
      error: error.message
    });
  }
};