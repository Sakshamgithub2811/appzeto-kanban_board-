import { useState } from "react";
import API from "../services/api";
import { socket } from "../services/socket";

export default function TaskModal({
  boardId,
  editTask,
  setEditTask,
  setShowModal,
  setTasks,
}) {
  const [form, setForm] = useState({
    title: editTask?.title || "",
    description: editTask?.description || "",
    priority: editTask?.priority || "medium",
    dueDate: editTask?.dueDate?.slice(0, 10) || "",
    assignedTo: editTask?.assignedTo || "",
    status: editTask?.status || "Todo",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    socket.emit("typing", {
      boardId,
      user: "saksham",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (editTask) {
        const res = await API.put(`/tasks/${editTask._id}`, form);

        setTasks((prev) =>
          prev.map((task) =>
            task._id === res.data.task._id ? res.data.task : task
          )
        );
      } else {
        const res = await API.post("/tasks", {
          ...form,
          boardId,
          position: 0,
        });

        setTasks((prev) => [...prev, res.data.task]);
      }

      setEditTask(null);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-bg">
      <form className="modal" onSubmit={submitHandler}>
        <h2>{editTask ? "Edit Task" : "Add Task"}</h2>

        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />

        <input
          name="assignedTo"
          placeholder="Assigned to"
          value={form.assignedTo}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Done">Done</option>
        </select>

        <button type="submit">
          {editTask ? "Update Task" : "Create Task"}
        </button>

        <button
          type="button"
          onClick={() => {
            setEditTask(null);
            setShowModal(false);
          }}
        >
          Close
        </button>
      </form>
    </div>
  );
}