import { useState, ChangeEvent } from "react";
import { useTodosHandler } from "../TodosProvider/TodosProvider.tsx";
import discardChangesIcon from "/icons/discard.svg";
import saveChangesIcon from "/icons/save.svg";

type TodoOverlayProps = {
	initialContent: string;
	onClose: () => void;
	onSaveChanges: (nextContent: string) => void;
};

export function TodoOverlay({
	initialContent,
	onClose,
	onSaveChanges,
}: TodoOverlayProps) {
	const [content, setContent] = useState(initialContent);

	function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		setContent(e.target.value);
	}

	function handleDiscard() {
		onClose();
	}

	function handleSave() {
		onSaveChanges(content);
	}

	return (
		<div className="bg-slate-500 flex fixed z-1 top-1/4 left-3 right-3 sm:left-1/3 sm:right-1/3">
			<textarea
				className="h-96 w-96"
				name="todo content"
				id=""
				value={content}
				onChange={handleChange}
			/>
			<div className="">
				<button type="button" onClick={handleSave}>
					<img src={saveChangesIcon} alt="save changes" />
				</button>
				<button type="button" onClick={handleDiscard}>
					<img src={discardChangesIcon} alt="discard changes" />
				</button>
			</div>
		</div>
	);
}
