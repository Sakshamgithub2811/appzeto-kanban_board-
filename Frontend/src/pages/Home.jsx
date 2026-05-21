import { useState } from "react";
import API from "../services/api";
import Board from "../components/Board";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [boardId, setBoardId] = useState("");
  const [activeBoardId, setActiveBoardId] = useState("");
  const [boardTitle, setBoardTitle] = useState("Kanban Board");

  const createBoard = async () => {
    if (!userId) {
      alert("Please enter username");
      return;
    }

    try {
      const res = await API.post("/boards", {
        title: "MERN Interview Board",
        createdBy: userId,
        members: [userId],
      });

      setBoardId(res.data.board._id);
      setActiveBoardId(res.data.board._id);
      setBoardTitle(res.data.board.title);
    } catch (error) {
      console.log(error);
    }
  };

  const loadBoard = async () => {
    if (!userId) {
      alert("Please enter username");
      return;
    }

    if (!boardId) {
      alert("Please enter board id");
      return;
    }

    try {
      const res = await API.get(`/boards/${boardId}`);

      setBoardTitle(res.data.board.title);
      setActiveBoardId(boardId);
    } catch (error) {
      console.log(error);
      alert("Board not found");
    }
  };

  return (
    <div className="home">
      <h1>{boardTitle}</h1>

      <div className="top-bar">
        <input
          placeholder="Enter Username"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <button onClick={createBoard}>Create New Board</button>

        <input
          placeholder="Enter Existing Board ID"
          value={boardId}
          onChange={(e) => setBoardId(e.target.value)}
        />

        <button onClick={loadBoard}>Join Board</button>
      </div>

      {activeBoardId && (
        <Board boardId={activeBoardId} userId={userId} />
      )}
    </div>
  );
}