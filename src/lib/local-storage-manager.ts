import { TodoItem } from "./types/todoItem";

const TODOS_KEY = "LOCALSTORAGE_TODOS_KEY";

export class LocalStorageManager {
	storedTodos: TodoItem[] = [];
	constructor() {
		try {
			const todos = JSON.parse(localStorage.getItem(TODOS_KEY) ?? "[]");

			if (Array.isArray(todos)) {
				this.storedTodos = todos;
				console.log("Successful init!");
				return;
			}
			throw new Error("Invalid type of todos, expected an array.");
		} catch (error) {
			alert(error);
		}
	}
	updateTodos(todos: TodoItem[]) {
		localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
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
