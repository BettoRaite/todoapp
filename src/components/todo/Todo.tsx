import styles from "./todo.module.css";
import { TodoItem } from "../../lib/types/todoItem";
import { useState, ChangeEvent } from "react";

interface TodoProps {
	handlers: {
		onDelete: (id: string) => void;
		onChange: (todoItem: TodoItem) => void;
	};
	todoItem: TodoItem;
}

function Todo({ handlers: { onDelete, onChange }, todoItem }: TodoProps) {
	const { id, content, isDone } = todoItem;
	const [input, setInput] = useState(content);
	const [isEditing, setIsEditing] = useState(false);

	function handleDeleteClick() {
		onDelete(id);
	}
	function handleEditClick() {
		setInput(content);
		setIsEditing(!isEditing);
	}
	function handleSaveClick() {
		setIsEditing(false);
		onChange({ ...todoItem, content: input });
	}
	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setInput(e.target.value);
	}
	function handleDoneClick() {
		onChange({
			...todoItem,
			isDone: true,
		});
	}
	function handleUndoneClick() {
		onChange({ ...todoItem, isDone: false });
	}

	let editButtons = <></>;
	let todoContent = (
		<h3 className={styles.title}>
			<del>{content}</del>
		</h3>
	);

	if (isDone === false) {
		if (isEditing) {
			todoContent = (
				<input
					className={styles.todoContentInput}
					value={input}
					onChange={handleInputChange}
				/>
			);
			editButtons = (
				<div>
					<button onClick={handleSaveClick}>Save</button>
					<button onClick={handleEditClick}>Discard</button>
				</div>
			);
		} else {
			todoContent = <h3 className={styles.todoContent}>{content}</h3>;
			editButtons = (
				<button type="button" onClick={handleEditClick}>
					edit
				</button>
			);
		}
	}

	return (
		<div className={styles.layout}>
			<input
				type="checkbox"
				checked={isDone}
				onChange={isDone ? handleUndoneClick : handleDoneClick}
			/>
			{todoContent}
			<div className={styles.buttonsWrapper}>
				{editButtons}
				<button type="button" onClick={handleDeleteClick}>
					delete
				</button>
			</div>
		</div>
	);
}

export default Todo;
