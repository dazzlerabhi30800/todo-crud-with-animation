import React, { useState, useEffect } from "react";
import "./App.css";
import Sun from "./Components/Sun";
import TodoList from "./Components/TodoList";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [changeTheme, setChangeTheme] = useState(false);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onDragEnd = (e) => {
    const { source, destination } = e;
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    let add,
      active = todos;
    if (source.droppableId === destination.droppableId) {
      add = active[source.index];
      active.splice(source.index, 1);
      active.splice(destination.index, 0, add);
    }
    setTodos(active);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
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
    </DragDropContext>
  );
}

export default App;
