import API from "../services/api";
import TaskCard from "./TaskCard";

export default function Column({
  title,
  boardId,
  tasks,
  setTasks,
  setEditTask,
  setShowModal,
}) {
  const handleDrop = async (e) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");

    try {
      const res = await API.put(`/tasks/${taskId}/move`, {
        status: title,
        position: tasks.length,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? res.data.task : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2> {title}</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          boardId={boardId}
          setTasks={setTasks}
          setEditTask={setEditTask}
          setShowModal={setShowModal}
        />
      ))}
    </div>
  );
}