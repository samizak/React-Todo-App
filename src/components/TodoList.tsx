import Todo from "../Types/Todo";
import TodoRow from "./TodoRow";

export default function TodoList(props: {
  todos: Todo[];
  removeTodo: any;
  toggleCompletedTodo: any;
  updateTodo: any;
}) {
  return (
    <ul>
      {props.todos.map((todo: any) => (
        <TodoRow
          key={todo.id}
          todo={todo}
          updateTodo={props.updateTodo}
          removeTodo={props.removeTodo}
          toggleCompletedTodo={props.toggleCompletedTodo}
        />
      ))}
    </ul>
  );
}
