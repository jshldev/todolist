import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([
    "test data 1",
    "test data 2",
    "test data 3",
  ]);
  const [newTask, setNewTask] = useState([]);

  function handleInputChange(input) {
    setNewTask(input.target.value);
  }

  function handleAddTask() {
    if (newTask.trim() === "") return;
    setTasks((t) => [...t, newTask]);
    setNewTask("");
  }

  function handleDeleteTask(index) {
    setTasks(tasks.filter((e, i) => i !== index));
  }
  function handleMoveUpTask(index) {}
  function handleMoveDownTask(index) {}

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={handleAddTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <button
              className="delete-button"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
            <button
              className="move-up-button"
              onClick={() => handleMoveUpTask(index)}
            >
              🔺
            </button>
            <button
              className="move-down-button"
              onClick={() => handleMoveDownTask(index)}
            >
              🔻
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
