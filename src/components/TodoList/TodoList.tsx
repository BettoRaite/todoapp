import styles from "./todoList.module.css";
import { useReducer } from "react";
import { TodoItem } from "../../lib/types.ts";
import { Todo } from "../Todo/Todo.tsx";
import { todosReducer, TodoAction } from "../../lib/todosReducer.ts";
import { AddTodo } from "../AddTodo/AddTodo.tsx";

interface TodoListProps {
	initialTodos: TodoItem[];
}
export function TodoList({ initialTodos }: TodoListProps) {
	const [todos, dispatch] = useReducer(todosReducer, initialTodos);

	function handleAdd(content: string) {
		dispatch({
			type: "add_todo",
			content,
		});
	}
	function handleDelete(id: string) {
		dispatch({
			type: "delete_todo",
			id,
		});
	}
	function handleChange(todo: TodoItem) {
		dispatch({
			type: "change_todo",
			...todo,
		});
	}
	const undoneTodos = [];
	const doneTodos = [];
	for (const todo of todos) {
		const t = (
			<Todo
				key={todo.id}
				onChange={handleChange}
				onDelete={handleDelete}
				todo={todo}
			/>
		);
		if (todo.isDone) {
			doneTodos.push(t);
		} else {
			undoneTodos.push(t);
		}
	}
	return (
		<div>
			<AddTodo onAdd={handleAdd} />
			<div className={styles.todosWrapper}>
				{undoneTodos}
				<h3>Done todos</h3>
				{doneTodos}
			</div>
		</div>
	);
}
