import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const initialList = [
    {
      task: "Write something down",
      id: uuidv4(),
      isComplete: false,
    },
    {
      task: "Do something else",
      id: uuidv4(),
      isComplete: false,
    },
  ];

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [isComplete, setIsComplete] = useState(true);
  const [list, setList] = useState(initialList);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  function handleAdd() {
    const newList = list.concat({ task, id: uuidv4(), isComplete: false });
    setList(newList);
  }

  function handleToggleComplete(id) {
    const newList = list.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          isComplete: !item.isComplete,
        };
        return updatedItem;
      }
      return item;
    });
    setList(newList);
  }

  function List({ list, onToggleComplete }) {
    console.log("reached list");
    return (
      <ul className="task-list">
        {list.map((item) => (
          <li key={item.id} className="task">
            <button
              className="check-button"
              type="button"
              onClick={() => onToggleComplete(item.id)}
            >
              {item.isComplete ? "[v]" : "[_]"}
            </button>
            <span
              style={{
                textDecoration: item.isComplete ? "line-through" : "none",
              }}
            >
              {item.task}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <form
        autoComplete="off"
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <input
          id="new-task-input"
          placeholder="Create a new task..."
          onChange={(e) => setTask(e.currentTarget.value)}
        />
        <button type="submit">Add</button>
      </form>

      <List list={list} onToggleComplete={handleToggleComplete} />

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        autoComplete="off"
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
