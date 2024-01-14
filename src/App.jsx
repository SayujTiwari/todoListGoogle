import { useState } from "react";
import { NewTaskForm } from "./task/newTaskInput.jsx";
import { TaskList } from "./task/taskList.jsx";
import Logout from "./google/googleApiLogout.jsx";

export default function App() {
  const [tasks, setTasks] = useState([]);

  function toggleTask(id, completed) {
    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed };
        }
        return task;
      });
    });
  }

  async function addTask(title) {
    const newTask = { id: crypto.randomUUID(), title, completed: false };
    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function deleteTask(id) {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id != id);
    });
  }

  return (
    <>
      <h1>To Do List</h1>
      <p>
        When you add a task you will to prompted to login in to google, so that
        the tasks can be added to your calendar!
      </p>

      <div id="google">
        <Logout />
      </div>
      <NewTaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </>
  );
}
