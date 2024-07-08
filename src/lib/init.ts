import { TodoItem } from "./types/todoItem";

export const LOCALSTORAGE_TODOS_KEY = "LOCALSTORAGE_TODOS_KEY";
export const LOCALSTORAGE_COMPLETED_TODOS_KEY =
	"LOCALSTORAGE_COMPLETED_TODOS_KEY";

export let storedTodos: TodoItem[] = [];
export let storedCompletedTodos: TodoItem[] = [];

function init() {
	try {
		const todos = JSON.parse(
			localStorage.getItem(LOCALSTORAGE_TODOS_KEY) ?? "[]",
		);
		const completedTodos = JSON.parse(
			localStorage.getItem(LOCALSTORAGE_COMPLETED_TODOS_KEY) ?? "[]",
		);
		if (Array.isArray(todos) && Array.isArray(completedTodos)) {
			storedTodos = todos;
			storedCompletedTodos = completedTodos;
			return;
		}
		throw new Error("Invalid type for todos/completedTodos");
	} catch (error) {
		alert(error);
	}
}
init();
