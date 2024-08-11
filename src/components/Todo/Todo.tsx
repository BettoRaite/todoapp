import clsx from "clsx";
import styles from "./todo.module.css";
import { TodoItem } from "../../lib/types.ts";
import { useState } from "react";
import deleteIcon from "/icons/delete.svg";
import editIcon from "/icons/edit.svg";
import checkIcon from "/icons/save.svg";
import doneIcon from "/icons/done.svg";
import { useTodosHandler } from "../TodosProvider/TodosProvider.tsx";
import { TodoOverlay } from "../TodoOverlay/TodoOverlay.tsx";

type TodoProps = {
	todo: TodoItem;
};

export function Todo({ todo }: TodoProps) {
	const [isEditing, setIsEditing] = useState(false);
	const todosHandler = useTodosHandler();

	function handleSave(content: string) {
		todosHandler.change({
			...todo,
			content,
		});
		handleModeChange();
	}
	function handleModeChange() {
		setIsEditing(!isEditing);
	}
	function handleDelete() {
		todosHandler.delete(todo.id);
	}
	function handleDone() {
		todosHandler.change({
			...todo,
			isDone: !todo.isDone,
		});
	}

	return (
		<div className="flex items-center gap-3 mb-4">
			<div className="overflow-hidden relative gap-5 p-2 pl-1 pr-10 rounded-md bg-white h-80 w-full">
				<button
					onClick={handleDone}
					className={clsx("bg-maize p-4 rounded-lg float-start  mr-4 transition-all", {
						"h-1/2 bg-pumpkin shadow-md shadow-cool-gray": todo.isDone
					})}
				>
					<img
						src={todo.isDone ? doneIcon : checkIcon}
						alt="change todo to done"
					/>
				</button>
				{/* <input type="checkbox" onChange={handleDone} checked={todo.isDone} /> */}
				<div className="top-12  w-full px-5 flex-wrap break-words ">
					<p className="font-bold text-gray-500 first-letter:uppercase">
						{todo.content.slice(0, 50)}
					</p>
				</div>
			</div>

			<div className="self-start flex flex-col gap-2 rounded w-1/5 sm:w-2/12">
				<button className={styles.button} onClick={handleModeChange}>
					<img src={editIcon} alt="edit todo" />
				</button>
				<button className={styles.button} onClick={handleDelete}>
					<img src={deleteIcon} alt="delete todo" />
				</button>
			</div>

			<TodoOverlay
				initialContent={todo.content}
				onClose={handleModeChange}
				onSaveChanges={handleSave}
				isHidden={!isEditing}
			/>
		</div>
	);
}
