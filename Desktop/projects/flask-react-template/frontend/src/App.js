// src/App.js
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  const addTask = () => {
    if (!newTask) return;
    fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTask }),
    })
      .then((res) => res.json())
      .then((data) => setTasks([...tasks, data]));
    setNewTask("");
  };

  const deleteTask = (index) => {
    fetch(`http://127.0.0.1:5000/tasks/${index}`, { method: "DELETE" }).then(
      () => setTasks(tasks.filter((_, i) => i !== index))
    );
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Type something"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task.name} <button onClick={() => deleteTask(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
