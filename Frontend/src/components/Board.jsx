import { useEffect, useState } from "react";
import API from "../services/api";
import { socket } from "../services/socket";
import Column from "./Column";
import TaskModal from "./TaskModal";

const columns = ["Todo", "In Progress", "Review", "Done"];

export default function Board({ boardId,userId  }) {
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");



  const getBoardData = async () => {
    try {
      const res = await API.get(`/boards/${boardId}`);

      setBoard(res.data.board);
      setTasks(res.data.tasks);

      socket.emit("join-board", {
        boardId,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBoardData();
  }, [boardId]);

  useEffect(() => {
    socket.on("task-created", (task) => {
      setTasks((prev) => {
        const exists = prev.some((item) => item._id === task._id);
        if (exists) return prev;
        return [...prev, task];
      });
    });

    socket.on("task-updated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    socket.on("task-moved", (movedTask) => {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === movedTask._id ? movedTask : task
        )
      );
    });

    socket.on("task-deleted", (taskId) => {
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    });

    socket.on("online-members", (users) => {
      setOnlineUsers(users);
    });

    socket.on("typing", (user) => {
      setTypingUser(`${user} is typing...`);

      setTimeout(() => {
        setTypingUser("");
      }, 1500);
    });

    return () => {
      socket.off("task-created");
      socket.off("task-updated");
      socket.off("task-moved");
      socket.off("task-deleted");
      socket.off("online-members");
      socket.off("typing");
    };
  }, []);

  const filteredTasks = priorityFilter
    ? tasks.filter((task) => task.priority === priorityFilter)
    : tasks;

  return (
    <div>
      <div >
       

        <button
          onClick={() => {
            setEditTask(null);
            setShowModal(true);
          }}
        >
          Add Task
        </button>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <p>
        <b>Board ID:</b> {boardId}
      </p>

      <p>
        <b>Online Users:</b> {onlineUsers.join(", ")}
      </p>

      <p>{typingUser}</p>

      <div className="board">
        {columns.map((column) => (
          <Column
            key={column}
            title={column}
            boardId={boardId}
            tasks={filteredTasks.filter((task) => task.status === column)}
            setTasks={setTasks}
            setEditTask={setEditTask}
            setShowModal={setShowModal}
          />
        ))}
      </div>

      {showModal && (
        <TaskModal
          boardId={boardId}
          editTask={editTask}
          setEditTask={setEditTask}
          setShowModal={setShowModal}
          setTasks={setTasks}
        />
      )}
    </div>
  );
}