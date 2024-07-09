import { TodoItem } from "../types/todoItem";
import { v4 as uuidv4 } from "uuid";
import { localStorageManager } from "../local-storage-manager";

export interface Action extends Partial<TodoItem> {
	type: "create" | "delete" | "change" | "done" | "undone";
}

export function todosReducer(todos: TodoItem[], action: Action) {
	let nextTodos: TodoItem[] = [];

	try {
		switch (action.type) {
			case "create": {
				if (typeof action.content !== "string") {
					throw new TypeError("todo content is undefined.");
				}
				nextTodos = [
					...todos,
					{
						id: uuidv4(),
						content: action.content,
						isDone: false,
					},
				];
				return nextTodos;
			}
			case "change": {
				if (typeof action.content !== "string") {
					throw new TypeError("todo content is undefined.");
				}
				if (typeof action.id !== "string") {
					throw new TypeError("todo id is undefined.");
				}
				if (typeof action.isDone !== "boolean") {
					throw new TypeError("todo isDone is undefined.");
				}
				nextTodos = todos.map((todo) => {
					if (todo.id === action.id) {
						return {
							id: action.id ?? "",
							content: action.content ?? "",
							isDone: action.isDone ?? false,
						};
					}
					return todo;
				});
				return nextTodos;
			}
			case "delete": {
				if (typeof action.id !== "string") {
					throw new TypeError("todo id is undefined.");
				}
				nextTodos = todos.filter((todo) => todo.id !== action.id);
				return nextTodos;
			}
			default:
				throw new TypeError("Undefined type of action.");
		}
	} catch (error) {
		console.error(error);
		return nextTodos;
	} finally {
		localStorageManager.updateTodos(nextTodos);
	}
}

// NOTE: Remove some time later.
// const initialState: TodoItem[] = [];

// const actions: Action[] = [
// 	{ type: "create", content: "Visit Kafka Museum" },
// 	{ type: "create", content: "Watch a puppet show" },
// 	{ type: "create", content: "Lennon Wall pic" },
// ];

// const finalState = actions.reduce(todosReducer, initialState);

// console.log(finalState);
