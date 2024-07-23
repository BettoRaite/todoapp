import homeIcon from "/icons/home.svg";
import { TodoList } from "./components/TodoList/TodoList.tsx";
import { InlineTodoList } from "./components/InlineTodoList/InlineTodoList.tsx";
import { retrieveTodos } from "./lib/local-storage.ts";
import { useState } from "react";
import { TodosProvider } from "./components/TodosProvider/TodosProvider.tsx";

export default function TodoApp() {
	// const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [isInlineMode, setIsInlineMode] = useState(false);
	let savedTodos = retrieveTodos();

	if (!Array.isArray(savedTodos)) {
		savedTodos = [];
	}

	let content = <TodoList />;
	if (isInlineMode) {
		content = <InlineTodoList />;
	}

	return (
		<>
			<TodosProvider initialTodos={savedTodos}>{content}</TodosProvider>

			<button
				onClick={() => setIsInlineMode(!isInlineMode)}
				className="fixed right-5 top-5 p-3 rounded-full"
			>
				<img src={homeIcon} alt="toggle settings modal" />
			</button>
		</>
	);
}
