import styles from "./app.module.css";
import { TodoList } from "./components/TodoList/TodoList.tsx";
import { InlineTodoList } from "./components/InlineTodoList/InlineTodoList.tsx";
import { retrieveTodos } from "./lib/local-storage.ts";
import { useState } from "react";
import { TodosProvider } from "./components/TodosProvider/TodosProvider.tsx";

export default function TodoApp() {
	const [isInlineMode, setIsInlineMode] = useState(true);
	let savedTodos = retrieveTodos();

	if (!Array.isArray(savedTodos)) {
		savedTodos = [];
	}

	return (
		<>
			<TodosProvider initialTodos={savedTodos}>
				{!isInlineMode && <TodoList />}
				{isInlineMode && <InlineTodoList />}
			</TodosProvider>

			<input
				className={styles.checkbox}
				type="checkbox"
				checked={isInlineMode}
				onChange={() => setIsInlineMode(!isInlineMode)}
			/>
		</>
	);
}
