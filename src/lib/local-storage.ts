import { TodoItem } from "./types.ts";
const TODOS_KEY = "my_todos";
export function retrieveTodos(): TodoItem[] {
	return JSON.parse(localStorage.getItem(TODOS_KEY) ?? "[]");
}
export function saveTodos(todos: TodoItem[]) {
	return localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
