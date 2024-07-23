import { TodoOverlay } from "../TodoOverlay/TodoOverlay.tsx";
import styles from "./todoList.module.css";
import { Todo } from "../Todo/Todo.tsx";
import { TodoAdd } from "../TodoAdd/AddTodo.tsx";
import { useTodos } from "../TodosProvider/TodosProvider.tsx";
import { useState } from "react";

type sort = "all" | "done" | "undone";

export function TodoList() {
	const [sort, setSort] = useState<sort>("all");
	const todos = useTodos();

	const todosContent = [];

	for (const todo of todos) {
		const t = <Todo key={todo.id} todo={todo} />;
		switch (sort) {
			case "all": {
				todosContent.push(t);
				break;
			}
			case "done": {
				if (todo.isDone) {
					todosContent.push(t);
				}
				break;
			}
			case "undone": {
				if (!todo.isDone) {
					todosContent.push(t);
				}
				break;
			}
		}
	}
	const sortOptions: sort[] = ["all", "done", "undone"];
	return (
		<div className="overflow-hidden bg-white  m-auto sm:p-10 p-6 rounded-md">
			<>
				<TodoAdd />

				<ul className="grid grid-cols-3 gap-2 text-center m-2 first-letter:*:capitalize">
					{sortOptions.map((sortType, i) => {
						return (
							<li
								key={i}
								className={`${styles.sortOption} ${sort === sortType && styles.selectedSortOption}`}
								onClick={() => setSort(sortType)}
							>
								{sortType}
							</li>
						);
					})}
				</ul>
				<div className={`w-full sm:w-96 ${styles.todosList}`}>
					{todosContent}
				</div>
			</>
		</div>
	);
}
