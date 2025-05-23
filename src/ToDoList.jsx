import { useState, useRef, useEffect } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  const [newTask, setNewTask] = useState([]);
  const inputField = useRef(null);

  function handleInputChange(input) {
    setNewTask(input.target.value);
  }

  function handleAddTask() {
    if (newTask.trim() === "") return;
    setTasks((t) => [...t, { text: newTask, isCompleted: false }]);
    setNewTask("");
    inputField.current.focus();
  }

  function handleDeleteTask(index) {
    setTasks(tasks.filter((e, i) => i !== index));
  }
  function handleMoveUpTask(index) {
    if (index < 1) return;
    const tempTasks = [...tasks];
    [tempTasks[index], tempTasks[index - 1]] = [
      tempTasks[index - 1],
      tempTasks[index],
    ];
    setTasks(tempTasks);
  }
  function handleMoveDownTask(index) {
    if (index >= tasks.length - 1) return;
    const tempTasks = [...tasks];
    [tempTasks[index], tempTasks[index + 1]] = [
      tempTasks[index + 1],
      tempTasks[index],
    ];
    setTasks(tempTasks);
  }

  function handleDeleteAllTask() {
    setTasks([]);
  }

  function toggle(index) {
    setTasks((tempTasks) => {
      return tempTasks.map((task, i) => {
        if (i === index) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      });
    });
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={handleInputChange}
          className="text-[1.8em] border-3 border-black/40 rounded-md m-3 bg-white"
          ref={inputField}
        />
        <button
          className="add-button !text-[1.4em] bg-green-300 hover:bg-green-400"
          onClick={handleAddTask}
        >
          Add
        </button>
        <button
          className=" !text-[1.4em] bg-red-400 hover:bg-red-500"
          onClick={handleDeleteAllTask}
        >
          Delete All
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              className={`text decoration-red-400 decoration-5 ${
                task.isCompleted ? "line-through text-gray-500" : ""
              }`}
              onClick={() => {
                toggle(index);
              }}
            >
              {task.text}
            </span>
            <button
              className="delete-button bg-red-600/60 hover:bg-red-600/80"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
            <button
              className="move-up-button bg-blue-200 hover:bg-blue-300"
              onClick={() => handleMoveUpTask(index)}
            >
              🔺
            </button>
            <button
              className="move-down-button bg-blue-200 hover:bg-blue-300"
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
