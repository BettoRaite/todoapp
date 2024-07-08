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
					throw new TypeError(
						"Failed to create todo\nInvalid type of todo content.",
					);
				}

				const todoItem: TodoItem = {
					id: uuidv4(),
					isDone: false,
					content: action.content,
				};
				nextTodos = [...todos, todoItem];

				return nextTodos;
			}
			case "delete": {
				nextTodos = todos.filter((todo) => todo.id !== action.id);

				return nextTodos;
			}
			case "change": {
				if (typeof action.content !== "string") {
					throw new TypeError(
						"Failed to change todo\nInvalid type of todo content.",
					);
				}

				nextTodos = todos.map((todo) => {
					if (todo.id === action.id) {
						return {
							...todo,
							// even though I check for action.content being string ts still complains.
							content: action.content ?? "",
						};
					}

					return todo;
				});

				return nextTodos;
			}
			case "done": {
				nextTodos = todos.map((todo) => {
					if (todo.id === action.id) {
						return {
							...todo,
							isDone: true,
						};
					}
					return todo;
				});

				return nextTodos;
			}
			case "undone": {
				nextTodos = todos.map((todo) => {
					if (todo.id === action.id) {
						return {
							...todo,
							isDone: false,
						};
					}
					return todo;
				});

				return nextTodos;
			}
			default: {
				throw new TypeError("Invalid type of action.");
			}
		}
	} catch (error) {
		console.error(error);
		return todos;
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
