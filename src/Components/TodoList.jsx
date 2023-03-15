import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Todo from "./Todo";
import { nanoid } from "nanoid";

const TodoList = ({ todos, setTodos }) => {
  const [inputValue, setInputValue] = useState("");

  const createTodo = () => {
    if (inputValue) {
      setTodos([
        ...todos,
        {
          value: inputValue,
          id: nanoid(),
          completed: false,
          edit: false,
        },
      ]);
    } else {
      alert("Please input Value");
      return;
    }
    setInputValue("");
  };
  return (
    <div className="todo-list-wrapper">
      <div className="submit-container">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          id="todo-text"
        />
        <button onClick={createTodo} className="submit-btn">
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => {
          return (
            <Todo setTodos={setTodos} todos={todos} todo={todo} key={index} />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
