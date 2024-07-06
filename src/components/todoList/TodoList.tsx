import styles from "./todoList.module.css";
import { useState } from "react";
import { TodoItem } from "../../lib/models/todoItem";
import { v4 as uuidv4 } from "uuid";
import Todo from "../todo/Todo";
import AddTodo from "../addTodo/AddTodo";

function TodoList() {
	const [todos, setTodos] = useState<TodoItem[]>([]);
	const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([]);

	function handleAdd(title: string) {
		const todoItem: TodoItem = {
			id: uuidv4(),
			isDone: false,
			isEdit: false,
			title,
		};
		setTodos([...todos, todoItem]);
	}
	function handleDelete(id: string, isDone: boolean) {
		if (isDone) {
			setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
		} else {
			setTodos(todos.filter((todo) => todo.id !== id));
		}
	}
	function handleEdit(id: string) {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) {
					return {
						...todo,
						isEdit: true,
					};
				}
				return todo;
			}),
		);
	}
	function handleSave(id: string, title: string) {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) {
					return {
						...todo,
						title,
						isEdit: false,
					};
				}
				return todo;
			}),
		);
	}
	function handleDiscardChanges(id: string) {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) {
					return {
						...todo,
						isEdit: false,
					};
				}
				return todo;
			}),
		);
	}

	function handleDone(id: string) {
		setTodos(
			todos.filter((todo) => {
				if (todo.id === id) {
					setCompletedTodos([
						...completedTodos,
						{
							...todo,
							isDone: true,
						},
					]);
					return false;
				}
				return true;
			}),
		);
	}
	function handleUndone(id: string) {
		setCompletedTodos(
			completedTodos.filter((todo) => {
				if (todo.id === id) {
					setTodos([
						...todos,
						{
							...todo,
							isDone: false,
						},
					]);
					return false;
				}
				return true;
			}),
		);
	}
	return (
		<>
			<AddTodo handleAdd={handleAdd} />
			<div className={styles.todosWrapper}>
				{todos.map((todoItem) => {
					return (
						<Todo
							key={todoItem.id}
							todoItem={todoItem}
							handleDelete={handleDelete}
							handleEdit={handleEdit}
							handleSave={handleSave}
							handleDiscardChanges={handleDiscardChanges}
							handleDone={handleDone}
							handleUndone={handleUndone}
						/>
					);
				})}
			</div>
			<h3>Completed</h3>
			<div className={styles.completedTodosWrapper}>
				{completedTodos.map((todoItem) => {
					return (
						<Todo
							key={todoItem.id}
							todoItem={todoItem}
							handleDelete={handleDelete}
							handleEdit={handleEdit}
							handleSave={handleSave}
							handleDiscardChanges={handleDiscardChanges}
							handleDone={handleDone}
							handleUndone={handleUndone}
						/>
					);
				})}
			</div>
		</>
	);
}

export default TodoList;
