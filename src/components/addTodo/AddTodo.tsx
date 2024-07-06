import styles from "./addTodo.module.css";
import { useState, ChangeEvent } from "react";

interface AddTodoProps {
	handleAdd: (title: string) => void;
}

function AddTodo({ handleAdd }: AddTodoProps) {
	const [title, setTitle] = useState("");
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setTitle(e.target.value);
	}
	function handleClick() {
		setTitle("");
		handleAdd(title);
	}
	return (
		<>
			<input
				name="add todo"
				className={styles.input}
				type="text"
				value={title}
				onChange={handleChange}
				maxLength={50}
				placeholder="Todo title"
			/>
			<button type="button" onClick={handleClick}>
				Add
			</button>
		</>
	);
}

export default AddTodo;
