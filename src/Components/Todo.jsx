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
    todoDiv.contentEditable = true;
    if (todoDiv.contentEditable) {
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
    }
    todoDiv.focus();
    // document.execCommand("selectAll", false, null);
    // window.getSelection().collapseToEnd();
    var range = document.createRange();
    range.selectNode(todoDiv.firstChild);
    todos.map((item) => {
      if (!item.edit) {
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        console.log("hello");
      } else {
        window.getSelection().removeAllRanges();
        console.log("bye");
      }
    });
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
    window.getSelection().removeAllRanges();
  };
  const handleDrag = (e) => {
    const currentElement = e.target;
    const offsetTop = currentElement.offsetTop;
    currentElement.style.transform = `translateY(${e.clientY}px)`;
  };
  return (
    <div
      onDrag={handleDrag}
      draggable={true}
      className={`todo ${todo.completed ? "completed" : ""}`}
    >
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
