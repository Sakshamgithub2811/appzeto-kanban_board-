import API from "../services/api";

export default function TaskCard({
  task,
  setTasks,
  setEditTask,
  setShowModal,
}) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task._id);
  };

  const deleteTask = async () => {
    try {
      await API.delete(`/tasks/${task._id}`);

      setTasks((prev) =>
        prev.filter((item) => item._id !== task._id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = () => {
    setEditTask(task);
    setShowModal(true);
  };

  return (
    <div className="task-card" draggable onDragStart={handleDragStart}>
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        <b>Priority:</b> {task.priority}
      </p>

      <p>
        <b>Assigned:</b> {task.assignedTo}
      </p>

      <p>
        <b>Due:</b>{" "}
        {task.dueDate ? task.dueDate.slice(0, 10) : "No date"}
      </p>

      <div className="task-actions">
        <button onClick={editHandler}>Edit</button>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </div>
  );
}