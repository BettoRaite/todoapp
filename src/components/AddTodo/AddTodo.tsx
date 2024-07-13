import { useState, ChangeEvent, FormEvent } from "react";

interface AddTodoProps {
	onAdd: (content: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
	const [content, setContent] = useState("");
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setContent(e.target.value);
	}
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		onAdd(content);
		setContent("");
	}
	return (
		<form onSubmit={handleSubmit}>
			<input
				value={content}
				type="text"
				placeholder="What do you want to do?"
				onChange={handleChange}
			/>
			<input type="submit" />
		</form>
	);
}
