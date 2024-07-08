import { TodoItem } from "./types/todoItem";

const TODOS_KEY = "LOCALSTORAGE_TODOS_KEY";
const COMPLETED_TODOS_KEY = "LOCALSTORAGE_COMPLETED_TODOS_KEY";

export class LocalStorageManager {
	storedTodos: TodoItem[] = [];
	storedCompletedTodos: TodoItem[] = [];
	constructor() {
		try {
			const todos = JSON.parse(localStorage.getItem(TODOS_KEY) ?? "[]");
			const completedTodos = JSON.parse(
				localStorage.getItem(COMPLETED_TODOS_KEY) ?? "[]",
			);
			if (Array.isArray(todos) && Array.isArray(completedTodos)) {
				this.storedTodos = todos;
				this.storedCompletedTodos = completedTodos;
				console.log("Successful init!");
				return;
			}
			throw new Error("Invalid type for todos/completedTodos");
		} catch (error) {
			alert(error);
		}
	}
	updateTodos(todos: TodoItem[]) {
		localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
	}
	updateCompletedTodos(completedTodos: TodoItem[]) {
		localStorage.setItem(COMPLETED_TODOS_KEY, JSON.stringify(completedTodos));
	}
}

window.onstorage = (event) => {
	console.log(`
Old value: ${event.oldValue}
New value: ${event.newValue}
Url: ${event.url}
`);
};

export const localStorageManager = new LocalStorageManager();
