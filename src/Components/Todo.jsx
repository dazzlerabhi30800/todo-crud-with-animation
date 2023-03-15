import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const Todo = ({ todo, setTodos, todos }) => {
  const handleCompleted = (id) => {
    if (todo.id === id) {
      setTodos(
        todos.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        })
      );
    } else {
      return;
    }
  };
  const handleDelete = (id) => {
    if (todo.id === id) {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      return;
    }
  };
  const handleEdit = (id) => {
    const todoDiv = document.getElementById(id);
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            edit: !item.edit,
            completed: item.completed ? false : item.completed,
          };
        }
        return item;
      })
    );
    todoDiv.contentEditable = true;
    todoDiv.focus();
    document.execCommand("selectAll", false, null);
    document.getSelection().collapseToEnd();
  };
  const completeEdit = (id) => {
    const editDiv = document.getElementById(id);
    const editValue = editDiv.innerHTML;
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            value: editValue,
            edit: !item.edit,
          };
        }
        return item;
      })
    );
    editDiv.contentEditable = false;
  };
  return (
    <div className={`todo ${todo.completed ? "completed" : ""}`}>
      <div
        className={`task-completion ${todo.completed ? "completed" : ""}`}
        onClick={() => handleCompleted(todo.id)}
      >
        <div className="mini-circle"></div>
      </div>
      <div id={todo.id} contentEditable={false} className="todo-value">
        {todo.value}
      </div>
      <div className="icon-wrapper">
        <button
          onClick={() => completeEdit(todo.id)}
          disabled={todo.edit ? false : true}
          className="btn confirm"
        >
          <FontAwesomeIcon icon={faSquareCheck} />
        </button>
        <button onClick={() => handleEdit(todo.id)} className="btn edit">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="btn trash" onClick={() => handleDelete(todo.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default Todo;
