import styles from "./todo.module.css";
import { TodoItem } from "../../lib/types.ts";
import { useState, ChangeEvent } from "react";
import deleteButtonIcon from "./deletebutton.svg";
import { useTodosHandler } from "../TodosProvider/TodosProvider.tsx";

type TodoProps = {
	todo: TodoItem;
};

export function Todo({ todo }: TodoProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [content, setContent] = useState("");
	const todosHandler = useTodosHandler();

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setContent(e.target.value);
	}
	function handleSave() {
		todosHandler.change({
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
		todosHandler.delete(todo.id);
	}
	function handleDone() {
		todosHandler.change({
			...todo,
			isDone: !todo.isDone,
		});
	}
	let buttons = <div></div>;
	if (todo.isDone) {
		buttons = (
			<button onClick={handleDelete}>
				<img src={deleteButtonIcon} alt="delete button icon" />
			</button>
		);
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
					<button onClick={handleDelete}>
						<img src={deleteButtonIcon} alt="delete button icon" />
					</button>
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
