import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import Todo from "./Todo";

const TodoList = () => {
  const checkDisability = () => {
    console.log("disabled");
  };
  return (
    <div className="todo-list-wrapper">
      <div className="submit-container">
        <input type="text" id="todo-text" />
        <FontAwesomeIcon className="submit-btn" icon={faCheck} />
      </div>
      <div className="todo-list">
        <Todo />
      </div>
    </div>
  );
};

export default TodoList;
