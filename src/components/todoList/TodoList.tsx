import styles from "./todoList.module.css";
import { useReducer } from "react";
import Todo from "../todo/Todo";
import AddTodo from "../addTodo/AddTodo";
import { localStorageManager } from "../../lib/local-storage-manager";
import { todosReducer } from "../../lib/reducer/todosReducer";

function TodoList() {
	const [todos, dispatch] = useReducer(
		todosReducer,
		localStorageManager.storedTodos,
	);

	function handleAdd(content: string) {
		dispatch({
			type: "create",
			content,
		});
	}

	function handleDelete(id: string) {
		dispatch({
			type: "delete",
			id,
		});
	}

	function handleChange(id: string, content: string) {
		dispatch({
			type: "change",
			content,
			id,
		});
	}

	function handleDone(id: string) {
		dispatch({
			type: "done",
			id,
		});
	}

	function handleUndone(id: string) {
		dispatch({
			type: "undone",
			id,
		});
	}

	return (
		<>
			<AddTodo handleAdd={handleAdd} />
			<div className={styles.todosLayout}>
				{todos.map((todoItem) => {
					if (!todoItem.isDone) {
						return (
							<Todo
								key={todoItem.id}
								todoItem={todoItem}
								handleDelete={handleDelete}
								handleDone={handleDone}
								handleUndone={handleUndone}
								handleChange={handleChange}
							/>
						);
					}
				})}
			</div>
			<h3 className={styles.highlighted}>Completed</h3>
			<div className={styles.completedTodosLayout}>
				{todos.map((todoItem) => {
					if (todoItem.isDone) {
						return (
							<Todo
								key={todoItem.id}
								todoItem={todoItem}
								handleDelete={handleDelete}
								handleDone={handleDone}
								handleUndone={handleUndone}
								handleChange={handleChange}
							/>
						);
					}
				})}
			</div>
		</>
	);
}

export default TodoList;
