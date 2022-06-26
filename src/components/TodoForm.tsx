import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TextField, Button, Tooltip } from "@mui/material";
import TodoList from "./TodoList";
import Todo from "../Types/Todo";

export default function TodoForm(props: {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
  const [todo, setTodo] = useState<Todo>({
    id: "",
    task: "",
    isCompleted: false,
  });

  // Append todo to list
  const addTodo = (todo: Todo) => props.setTodos([todo, ...props.todos]);

  // Remove a Task from the list after a delay (play delete animation first, then delete)
  const removeTodo = (id: any) => {
    setTimeout(() => {
      // 'currentState' callback Gets the most up to date version of the list!
      props.setTodos((currentState) =>
        currentState.filter((todo: Todo) => todo.id !== id)
      );
    }, 400);
  };

  // Update a Task
  const updateTodo = (updatedTodo: Todo) => {
    // Ignore empty input
    if (!updatedTodo.task.trim()) return;
    // Find and update the task
    props.setTodos((prev: Todo[]) =>
      prev.map((item: Todo) =>
        item.id === updatedTodo.id ? updatedTodo : item
      )
    );
  };

  // Set the Task to complete or incomplete
  const toggleCompletedTodo = (id: string) => {
    let updatedTodos = props.todos.map((todo) => {
      if (todo.id === id) todo.isCompleted = !todo.isCompleted;

      return todo;
    });

    props.setTodos(updatedTodos);
  };

  // Update input TextField as user types data
  const handleTaskInputChange = (e: any) =>
    setTodo({ ...todo, task: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Ignore empty input
    if (!todo.task.trim()) return;

    // Add Todo task to the list
    addTodo({ ...todo, id: uuidv4() });
    // Reset input TextField
    setTodo({ ...todo, task: "" });
  };

  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <TextField
          id="todo-text-field"
          label="Task"
          type="text"
          name="task"
          value={todo.task}
          variant="standard"
          onChange={handleTaskInputChange}
        />

        <Tooltip title="Add task to list">
          <Button type="submit" variant="outlined">
            Add
          </Button>
        </Tooltip>
      </form>

      <TodoList
        todos={props.todos}
        updateTodo={updateTodo}
        removeTodo={removeTodo}
        toggleCompletedTodo={toggleCompletedTodo}
      />
    </div>
  );
}
