import styles from "./app.module.css";
import { TodoList } from "./components/TodoList/TodoList.tsx";
import { retrieveTodos } from "./lib/local-storage.ts";

function App() {
	let savedTodos = retrieveTodos();
	if (!Array.isArray(savedTodos)) {
		savedTodos = [];
	}
	return (
		<>
			<div className={styles.todoListWrapper}>
				<TodoList initialTodos={savedTodos} />
			</div>
		</>
	);
}

export default App;
