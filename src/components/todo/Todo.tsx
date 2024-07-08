import styles from "./todo.module.css";
import { TodoItem } from "../../lib/types/todoItem";
import { useState, ChangeEvent } from "react";

interface TodoProps {
	handleDelete: (id: string) => void;
	handleSave: (id: string, title: string) => void;
	handleDiscardChanges: (id: string) => void;
	handleDone: (id: string) => void;
	handleUndone: (id: string) => void;
	todoItem: TodoItem;
}

function Todo({
	handleDelete,
	handleSave,
	handleDone,
	handleUndone,
	todoItem: { id, title, isDone },
}: TodoProps) {
	const [input, setInput] = useState(title);
	const [isEditing, setIsEditing] = useState(false);

	function handleDeleteClick() {
		handleDelete(id);
	}
	function handleEditClick() {
		setInput(title);
		setIsEditing(!isEditing);
	}
	function handleSaveClick() {
		setIsEditing(false);
		handleSave(id, input);
	}
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setInput(e.target.value);
	}
	function handleDoneClick() {
		handleDone(id);
	}
	function handleUndoneClick() {
		handleUndone(id);
	}
	return (
		<div className={styles.layout}>
			<input
				type="checkbox"
				checked={isDone}
				onChange={isDone ? handleUndoneClick : handleDoneClick}
			/>
			{isEditing ? (
				<input value={input} onChange={handleChange} />
			) : isDone ? (
				<h3 className={styles.title}>
					<del>{title}</del>
				</h3>
			) : (
				<h3 className={styles.title}>{title}</h3>
			)}
			<div className={styles.buttonsWrapper}>
				{isDone === false &&
					(isEditing ? (
						<div>
							<button onClick={handleSaveClick}>Save</button>
							<button onClick={handleEditClick}>Discard</button>
						</div>
					) : (
						<button type="button" onClick={handleEditClick}>
							edit
						</button>
					))}

				<button type="button" onClick={handleDeleteClick}>
					delete
				</button>
			</div>
		</div>
	);
}

export default Todo;
