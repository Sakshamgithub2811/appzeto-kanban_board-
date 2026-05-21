const Board = require("../models/board.model");
const Task = require("../models/task.model");
const Activity = require("../models/activity.model");

exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create(req.body);

    res.status(201).json({
      success: true,
      message: "Board created successfully",
      board
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Board not created",
      error: error.message
    });
  }
};

exports.inviteMember = async (req, res) => {
  try {
    const { member } = req.body;

    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { members: member }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Member invited successfully",
      board
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Member not invited",
      error: error.message
    });
  }
};

exports.getBoardData = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    const tasks = await Task.find({ boardId: req.params.id }).sort({
      position: 1,
    });

    const activities = await Activity.find({
      boardId: req.params.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      board,
      tasks,
      activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Board data not found",
      error: error.message,
    });
  }
};