import styles from "./addTodo.module.css";
import { useState, ChangeEvent, FormEvent } from "react";
interface AddTodoProps {
	onAdd: (title: string) => void;
}

function AddTodo({ onAdd }: AddTodoProps) {
	const [input, setInput] = useState("");

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setInput(e.target.value);
	}
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setInput("");
		onAdd(input);
	}

	return (
		<form className={styles.addTodoForm} onSubmit={handleSubmit}>
			<input
				name="add todo"
				className={styles.input}
				type="text"
				value={input}
				onChange={handleChange}
				maxLength={50}
				placeholder="Hey! What do you want to do?"
				required
			/>
			<button className={styles.addTodoButton} type="submit">
				Add
			</button>
		</form>
	);
}

export default AddTodo;
