import styles from "./todoList.module.css";
import { Todo } from "../Todo/Todo.tsx";
import { TodoAdd } from "../TodoAdd/AddTodo.tsx";
import { useTodos } from "../TodosProvider/TodosProvider.tsx";

export function TodoList() {
	const todos = useTodos();

	const undoneTodos = [];
	const doneTodos = [];

	for (const todo of todos) {
		const t = <Todo key={todo.id} todo={todo} />;
		if (todo.isDone) {
			doneTodos.push(t);
		} else {
			undoneTodos.push(t);
		}
	}

	return (
		<div className="bg-white p-10 rounded-md">
			<>
				<TodoAdd />

				<div className={styles.todosWrapper}>
					{undoneTodos}
					<h3>Done todos</h3>
					{doneTodos}
				</div>
			</>
		</div>
	);
}
