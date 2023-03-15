import React, { useState, useEffect } from "react";
import "./App.css";
import Sun from "./Components/Sun";
import TodoList from "./Components/TodoList";

function App() {
  const [changeTheme, setChangeTheme] = useState(false);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <div todo-status="active" className="background-changer"></div>
      <header>
        <h1 className="title">Todo App By Dazzler</h1>
        <Sun changeTheme={changeTheme} setChangeTheme={setChangeTheme} />
      </header>
      <main>
        <TodoList todos={todos} setTodos={setTodos} />
      </main>
    </div>
  );
}

export default App;
