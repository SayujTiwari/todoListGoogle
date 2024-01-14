import { TaskItem } from "./TaskItem";

export function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <ul className="list">
      {tasks.length === 0 && "No Tasks"}
      {tasks.map((task) => {
        return (
          <TaskItem
            {...task}
            key={task.id}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </ul>
  );
}
