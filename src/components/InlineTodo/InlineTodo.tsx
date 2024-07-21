import { v4 as uuidv4 } from "uuid";
import { useState, ChangeEvent, MutableRefObject } from "react";
import { TodoItem } from "../../lib/types.ts";
import styles from "./inlineTodo.module.css";
import { useTodosHandler } from "../TodosProvider/TodosProvider.tsx";

export type InlineTodoProps = {
	todo?: TodoItem;
	inlineTodoIndex: number;
	inputRefs: MutableRefObject<HTMLInputElement[]>;
	onUseTodoId: (todoId: string, inlineTodoIndex: number) => void;
};

export function InlineTodo({
	todo,
	inlineTodoIndex,
	inputRefs,
	onUseTodoId,
}: InlineTodoProps) {
	const todosHandler = useTodosHandler();
	const [content, setContent] = useState(todo ? `[-]:${todo.content}` : "");
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		const hasPrefix = value.startsWith("[-]:") || value.startsWith("[+]:");
		if (!todo && hasPrefix) {
			const todoId = uuidv4();

			onUseTodoId(todoId, inlineTodoIndex);
			todosHandler.addInline(value, todoId);
			return;
		} else if (todo && hasPrefix) {
			todosHandler.change({
				...todo,
				content: value,
			});
		} else if (todo) {
			todosHandler.delete(todo.id);
		}
		setContent(value);
	}
	return (
		<input
			ref={(ref) => {
				if (ref) {
					inputRefs.current[inlineTodoIndex] = ref;
				}
			}}
			className={`${styles.inlineTodo} ${todo ? (todo.isDone ? styles.highlightedDone : styles.highlighted) : ""}`}
			value={content}
			onChange={handleChange}
		/>
	);
}
