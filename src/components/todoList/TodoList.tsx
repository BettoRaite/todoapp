import styles from "./todoList.module.css";
import { useReducer } from "react";
import Todo from "../todo/Todo";
import AddTodo from "../addTodo/AddTodo";
import { localStorageManager } from "../../lib/local-storage-manager";
import { todosReducer } from "../../lib/reducer/todosReducer";
import { TodoItem } from "../../lib/types/todoItem";

function TodoList() {
	const [todos, dispatch] = useReducer(
		todosReducer,
		localStorageManager.storedTodos,
	);
	function handleAdd(content: string) {
		dispatch({ type: "create", content });
	}
	function handleDelete(id: string) {
		dispatch({ type: "delete", id });
	}
	function handleChange(todoItem: TodoItem) {
		dispatch({ type: "change", ...todoItem });
	}
	const handlers = {
		onDelete: handleDelete,
		onChange: handleChange,
	};
	return (
		<>
			<AddTodo onAdd={handleAdd} />
			<div className={styles.todosLayout}>
				{todos.map((todoItem) => {
					if (!todoItem.isDone) {
						return (
							<Todo key={todoItem.id} todoItem={todoItem} handlers={handlers} />
						);
					}
				})}
			</div>
			<h3 className={styles.highlighted}>Completed</h3>
			<div className={styles.completedTodosLayout}>
				{todos.map((todoItem) => {
					if (todoItem.isDone) {
						return (
							<Todo key={todoItem.id} todoItem={todoItem} handlers={handlers} />
						);
					}
				})}
			</div>
		</>
	);
}

export default TodoList;
