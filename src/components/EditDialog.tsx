import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Todo from "../Types/Todo";

export default function EditDialog(props: {
  todo: Todo;
  isDialogOpened: any;
  handleCloseDialog: any;
  updateTodo: any;
}) {
  let [_todo, setTodo] = useState(props.todo);

  const handleClose = () => {
    // Reset input TextField
    setTodo({ ..._todo, task: props.todo.task });
    // Close the popup
    props.handleCloseDialog(false);
  };

  const handleSave = () => {
    // Ignore empty input
    if (!_todo.task.trim()) return;
    // Update task values
    props.updateTodo(_todo);
    // Close the popup
    props.handleCloseDialog(false);
  };

  // Update input TextField as user types data
  const handleTaskInputChange = (e: { target: { value: any } }) => {
    setTodo({ ..._todo, task: e.target.value });
  };

  return (
    <React.Fragment>
      <Dialog open={props.isDialogOpened} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            id="edit-todo-text-field"
            label="Task"
            type="text"
            name="task"
            value={_todo.task}
            variant="standard"
            onChange={handleTaskInputChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
