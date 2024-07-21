import { useState, ChangeEvent } from "react";
import { useTodosHandler } from "../TodosProvider/TodosProvider.tsx";

export function TodoAdd() {
	const todosHandler = useTodosHandler();
	const [content, setContent] = useState("");
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setContent(e.target.value);
	}
	function handleAdd() {
		todosHandler.add(content);
		setContent("");
	}
	return (
		<section className="border rounded mb-5">
			<input
				className="outline-none p-2"
				value={content}
				type="text"
				placeholder="What needs to be done?"
				onChange={handleChange}
			/>
			<button
				type="button"
				className="rounded-r-none bg-slate-200 font-medium"
				onClick={handleAdd}
			>
				Add
			</button>
		</section>
	);
}
