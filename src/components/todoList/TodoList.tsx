import styles from "./todoList.module.css";
import { useState, useReducer } from "react";
import { TodoItem } from "../../lib/types/todoItem";
import { v4 as uuidv4 } from "uuid";
import Todo from "../todo/Todo";
import AddTodo from "../addTodo/AddTodo";
import { localStorageManager } from "../../lib/todos-manager";

function TodoList() {
	const [todos, setTodos] = useState<TodoItem[]>(
		localStorageManager.storedTodos,
	);
	function handleAdd(title: string) {
		const todoItem: TodoItem = {
			id: uuidv4(),
			isDone: false,
			title,
		};
		const nextTodos = [...todos, todoItem];
		setTodos(nextTodos);
		localStorageManager.updateTodos(nextTodos);
	}

	function handleDelete(id: string) {
		const nextTodos = todos.filter((todo) => todo.id !== id);
		setTodos(nextTodos);
		localStorageManager.updateTodos(nextTodos);
	}

	function handleSave(id: string, title: string) {
		const nextTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					title,
					isEdit: false,
				};
			}
			return todo;
		});

		setTodos(nextTodos);
		localStorageManager.updateTodos(nextTodos);
	}

	function handleDiscardChanges(id: string) {
		const nextTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					isEdit: false,
				};
			}
			return todo;
		});
		setTodos(nextTodos);
	}

	function handleDone(id: string) {
		const nextTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					isDone: true,
				};
			}
			return todo;
		});
		setTodos(nextTodos);
		localStorageManager.updateTodos(nextTodos);
	}

	function handleUndone(id: string) {
		const nextTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					isDone: false,
				};
			}
			return todo;
		});
		setTodos(nextTodos);
		localStorageManager.updateTodos(nextTodos);
	}

	return (
		<>
			<AddTodo handleAdd={handleAdd} />
			<div className={styles.todosLayout}>
				{todos.map((todoItem) => {
					if (!todoItem.isDone) {
						return (
							<Todo
								key={todoItem.id}
								todoItem={todoItem}
								handleDelete={handleDelete}
								handleSave={handleSave}
								handleDiscardChanges={handleDiscardChanges}
								handleDone={handleDone}
								handleUndone={handleUndone}
							/>
						);
					}
				})}
			</div>
			<h3 className={styles.highlighted}>Completed</h3>
			<div className={styles.completedTodosLayout}>
				{todos.map((todoItem) => {
					if (todoItem.isDone) {
						return (
							<Todo
								key={todoItem.id}
								todoItem={todoItem}
								handleDelete={handleDelete}
								handleSave={handleSave}
								handleDiscardChanges={handleDiscardChanges}
								handleDone={handleDone}
								handleUndone={handleUndone}
							/>
						);
					}
				})}
			</div>
		</>
	);
}

export default TodoList;
