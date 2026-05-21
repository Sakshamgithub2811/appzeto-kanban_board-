const express = require("express");
const router = express.Router();

const {
  createBoard,
  inviteMember,
  getBoardData
} = require("../controllers/board.controller");

router.post("/", createBoard);
router.put("/:id/invite", inviteMember);
router.get("/:id", getBoardData);

module.exports = router;