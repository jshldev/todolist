import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState([]);

  function handleInputChange(input) {
    setNewTask(input.target.value);
  }

  function handleAddTask() {}

  return (
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
  );
}

export default ToDoList;
