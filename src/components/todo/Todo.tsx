import styles from "./todo.module.css";
import { TodoItem } from "../../lib/models/todoItem";
import { useState, ChangeEvent } from "react";

interface TodoProps {
	handleDelete: (id: string, isDone: boolean) => void;
	handleEdit: (id: string) => void;
	handleSave: (id: string, title: string) => void;
	handleDiscardChanges: (id: string) => void;
	handleDone: (id: string) => void;
	handleUndone: (id: string) => void;
	todoItem: TodoItem;
}

function Todo({
	handleDelete,
	handleEdit,
	handleSave,
	handleDiscardChanges,
	handleDone,
	handleUndone,
	todoItem: { id, title, isEdit, isDone },
}: TodoProps) {
	const [input, setInput] = useState(title);

	function handleDeleteClick() {
		handleDelete(id, isDone);
	}
	function handleEditClick() {
		handleEdit(id);
	}
	function handleSaveClick() {
		handleSave(id, input);
	}
	function handleDiscardClick() {
		setInput(title);
		handleDiscardChanges(id);
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
			{isEdit ? (
				<input value={input} onChange={handleChange} />
			) : isDone ? (
				<h3>
					<del>{title}</del>
				</h3>
			) : (
				<h3>{title}</h3>
			)}
			{isDone === false &&
				(isEdit ? (
					<div>
						<button onClick={handleSaveClick}>Save</button>
						<button onClick={handleDiscardClick}>Discard</button>
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
	);
}

export default Todo;
