import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "./types.ts";
import { saveTodos } from "./local-storage.ts";
export interface TodoAction extends Partial<TodoItem> {
	type: "add_todo" | "delete_todo" | "change_todo";
}

export function todosReducer(todos: TodoItem[], action: TodoAction) {
	let nextTodos: TodoItem[] = [];
	let isError = false;
	try {
		switch (action.type) {
			case "add_todo": {
				if (typeof action.content !== "string") {
					throw new TypeError("action.content is not a string.");
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
			case "change_todo": {
				if (typeof action.content !== "string") {
					throw new TypeError("action.content is not a string.");
				}
				if (typeof action.id !== "string") {
					throw new TypeError("action.id is not a string.");
				}
				if (typeof action.isDone !== "boolean") {
					throw new TypeError("action.id is not a bool.");
				}
				nextTodos = todos.map((todo) => {
					if (todo.id === action.id) {
						return {
							...todo,
							...action,
						};
					}
					return todo;
				});
				return nextTodos;
			}
			case "delete_todo": {
				if (typeof action.id !== "string") {
					throw new TypeError("action.id is not a string.");
				}
				nextTodos = todos.filter((todo) => todo.id !== action.id);
				return nextTodos;
			}
			default:
				throw new Error("Invalid type of action.");
		}
	} catch (error) {
		console.error(`action object: ${action}`);
		console.error(error);
		isError = true;
		saveTodos(todos);
		return todos;
	} finally {
		if (!isError) {
			saveTodos(nextTodos);
		}
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
