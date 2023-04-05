import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { Draggable } from "react-beautiful-dnd";

const Todo = ({ todo, setTodos, todos, index }) => {
  const [checkComplete, setCheckComplete] = useState(false);
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
          if (item.completed) {
            setCheckComplete((prevState) => (prevState = true));
          }
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
      } else {
        window.getSelection().removeAllRanges();
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
            completed: checkComplete ? true : item.completed,
          };
        }
        return item;
      })
    );
    editDiv.contentEditable = false;
    window.getSelection().removeAllRanges();
    setCheckComplete((prevState) => (prevState = false));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`todo ${todo.completed ? "completed" : ""} ${
            snapshot.isDragging ? "drag" : ""
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className={`task-completion ${todo.completed ? "completed" : ""}`}
            onClick={() => handleCompleted(todo.id)}
          >
            <div className="mini-circle"></div>
          </div>
          <div
            id={todo.id}
            contentEditable={false}
            className={`todo-value ${todo.edit ? "focus" : ""}`}
          >
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
      )}
    </Draggable>
  );
};

export default Todo;
