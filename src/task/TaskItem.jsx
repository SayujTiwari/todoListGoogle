// checking delete or checked off
export function TaskItem({ completed, id, title, toggleTask, deleteTask }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTask(id, e.target.checked)}
        />
        {title}
        <button onClick={() => deleteTask(id)} className="del-btn">
          Delete
        </button>
      </label>
    </li>
  );
}
