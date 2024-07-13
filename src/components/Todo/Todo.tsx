import styles from "./todo.module.css";
import { TodoItem } from "../../lib/types.ts";
import { useState, ChangeEvent } from "react";

interface TodoProps {
	onDelete: (id: string) => void;
	onChange: (todo: TodoItem) => void;
	todo: TodoItem;
}
export function Todo({ onChange, onDelete, todo }: TodoProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [content, setContent] = useState("");

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setContent(e.target.value);
	}
	function handleSave() {
		onChange({
			...todo,
			content,
		});
		setIsEditing(false);
	}
	function handleModeChange() {
		setContent(todo.content);
		setIsEditing(!isEditing);
	}
	function handleDelete() {
		onDelete(todo.id);
	}
	function handleDone() {
		onChange({
			...todo,
			isDone: !todo.isDone,
		});
	}
	let buttons = <div></div>;
	if (todo.isDone) {
		buttons = <button onClick={handleDelete}>delete</button>;
	} else {
		if (isEditing) {
			buttons = (
				<div className={styles.buttons}>
					<button onClick={handleSave}>save</button>
					<button onClick={handleModeChange}>discard</button>
				</div>
			);
		} else {
			buttons = (
				<div className={styles.buttons}>
					<button onClick={handleModeChange}>edit</button>
					<button onClick={handleDelete}>delete</button>
				</div>
			);
		}
	}

	return (
		<div className={styles.layout}>
			<input type="checkbox" onChange={handleDone} checked={todo.isDone} />
			{isEditing ? (
				<input value={content} onChange={handleChange} />
			) : (
				<p>{todo.content}</p>
			)}
			{buttons}
		</div>
	);
}
