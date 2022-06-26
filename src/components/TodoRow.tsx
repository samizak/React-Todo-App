import { useState } from "react";
import { Checkbox, IconButton, Typography, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import EditDialog from "./EditDialog";
import Todo from "../Types/Todo";
import "../styles/Row.css";

export default function TodoRow(props: {
  todo: Todo;
  removeTodo: any;
  toggleCompletedTodo: any;
  updateTodo: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [fadeIn, setFadeIn] = useState("");

  const handleOpen = () => setIsOpen(!isOpen);

  // Wait a very small amount before playing '.show' css animation
  setTimeout(() => {
    setFadeIn("show");
  }, 10);

  const handleSetTaskComplete = () => {
    if (isOpen) return;
    props.toggleCompletedTodo(props.todo.id);
  };
  return (
    <div
      className={
        "todo-row " +
        (props.todo.isCompleted ? "completed " : "") +
        (isDelete ? "deleteSlide" : fadeIn)
      }
      onClick={handleSetTaskComplete}
    >
      {props.todo.isCompleted ? <div className="strike" /> : null}

      <div className="todo">
        <Tooltip
          title={
            "Mark as " + (props.todo.isCompleted ? "Incomplete" : "Complete")
          }
        >
          <Checkbox
            checked={props.todo.isCompleted}
            onClick={(e) => {
              e.stopPropagation();
              return handleSetTaskComplete();
            }}
          />
        </Tooltip>

        <Typography variant="body1">{props.todo.task}</Typography>
      </div>

      {/* Ignore onClick events when settings button pressed  */}
      <div className="settings" onClick={(e) => e.stopPropagation()}>
        <Tooltip title="Edit Task">
          <IconButton onClick={() => handleOpen()} disabled={isDelete}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Task">
          <IconButton
            onClick={() => {
              setIsDelete(true);
              return props.removeTodo(props.todo.id);
            }}
            disabled={isDelete}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </div>

      <EditDialog
        todo={props.todo}
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
        updateTodo={props.updateTodo}
      />
    </div>
  );
}
