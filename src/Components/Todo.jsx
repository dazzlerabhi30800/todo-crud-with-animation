import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const Todo = () => {
  return (
    <div className="todo">
      <div className="task-completion">
        <div className="mini-circle"></div>
      </div>
      <input type="text" readOnly value="task" className="todo-value" />
      <div className="icon-wrapper">
        <button
          //   onClick={checkDisability}
          disabled={true}
          className="btn confirm"
        >
          <FontAwesomeIcon icon={faSquareCheck} />
        </button>
        <button className="btn edit">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="btn trash">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default Todo;
