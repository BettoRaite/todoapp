import styles from "./addTodo.module.css";
import { useState, ChangeEvent, FormEvent } from "react";
interface AddTodoProps {
	handleAdd: (title: string) => void;
}

function AddTodo({ handleAdd }: AddTodoProps) {
	const [title, setTitle] = useState("");

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setTitle(e.target.value);
	}
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setTitle("");
		handleAdd(title);
	}

	return (
		<form className={styles.addTodoForm} onSubmit={handleSubmit}>
			<input
				name="add todo"
				className={styles.input}
				type="text"
				value={title}
				onChange={handleChange}
				maxLength={50}
				placeholder="Todo title"
				required
			/>
			<button className={styles.addTodoButton} type="submit">
				Add
			</button>
		</form>
	);
}

export default AddTodo;
