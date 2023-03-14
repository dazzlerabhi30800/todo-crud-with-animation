import React, { useState, useEffect } from "react";
import "./App.css";
import Sun from "./Components/Sun";
import TodoList from "./Components/TodoList";

function App() {
  const [changeTheme, setChangeTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );
  const [data, setData] = useState([]);
  function checkTheme() {
    if (changeTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
  useEffect(() => {
    checkTheme();
  }, []);
  return (
    <div className="App">
      <div data-status="active" className="background-changer"></div>
      <header>
        <h1 className="title">Todo App By Dazzler</h1>
        <Sun changeTheme={changeTheme} setChangeTheme={setChangeTheme} />
      </header>
      <main>
        <TodoList data={data} setData={setData} />
      </main>
    </div>
  );
}

export default App;
