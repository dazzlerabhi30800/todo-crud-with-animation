import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Todo from "./Todo";
import { nanoid } from "nanoid";

const TodoList = ({ todos, setTodos }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const todoItems = document.querySelectorAll(".todo");
    todoItems.forEach((item) => {
      item.addEventListener("dragstart", () => {
        item.classList.add("dragging");
      });
      item.addEventListener("touchstart", () => {
        item.classList.add("dragging");
      });
      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
      });
      item.addEventListener("touchend", () => {
        item.classList.remove("dragging");
      });
    });
  });

  const dragOver = (e) => {
    e.preventDefault();
    const todoList = document.querySelector(".todo-list");
    const draggable = document.querySelector(".dragging");
    const positionY = e.clientY || e.touches[0].clientY;
    const afterElement = getDragAfterElement(todoList, positionY);
    if (afterElement !== null) {
      todoList.insertBefore(draggable, afterElement);
    } else {
      todoList.append(draggable);
    }
  };

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".todo:not(.dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

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
      <div onTouchMove={dragOver} onDragOver={dragOver} className="todo-list">
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
