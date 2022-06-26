import React, { useState } from "react";
import "./styles/App.css";
import TodoForm from "./components/TodoForm";
import { Typography, Divider } from "@mui/material";
import Todo from "./Types/Todo";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const GetTasksCompletedString = () => {
    const completedTasksCount = todos.filter((todo) => todo.isCompleted).length;
    const tasksCount = todos.length;

    if (tasksCount === 0) return "There are no tasks!";

    return completedTasksCount + " of " + tasksCount + " Tasks completed";
  };

  return (
    <div className="todo-app">
      <div className="heading">
        <Typography variant="h3">My Tasks</Typography>
        <Typography variant="body1">{GetTasksCompletedString()}</Typography>
        <Divider variant="middle" />
      </div>

      <TodoForm todos={todos} setTodos={setTodos} />
    </div>
  );
}
