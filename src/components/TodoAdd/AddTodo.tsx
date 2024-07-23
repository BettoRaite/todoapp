import styles from "./addTodo.module.css";
import { useState, ChangeEvent } from "react";
import { useTodosHandler } from "../TodosProvider/TodosProvider.tsx";

export function TodoAdd() {
	const todosHandler = useTodosHandler();
	const [content, setContent] = useState("");
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setContent(e.target.value);
	}
	function handleAdd() {
		if (content !== "") {
			todosHandler.add(content);
			setContent("");
		}
	}
	return (
		<section className="flex justify-between border rounded mb-5 w-full">
			<input
				required={true}
				className="outline-none p-2 w-full"
				value={content}
				type="text"
				placeholder="What needs to be done?"
				onChange={handleChange}
			/>
			<button
				type="button"
				className={`rounded-r-none bg-amber-300 text-gray-500 font-bold ${styles.addButton}`}
				onClick={handleAdd}
			>
				Add
			</button>
		</section>
	);
}
