import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Todo from "./Todo";
import { nanoid } from "nanoid";
import { Droppable } from "react-beautiful-dnd";

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
      <Droppable droppableId="todolist">
        {(provided) => (
          <div
            className="todo-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, index) => {
              return (
                <Todo
                  setTodos={setTodos}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
