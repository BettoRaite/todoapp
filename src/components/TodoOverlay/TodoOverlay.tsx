import { useState, ChangeEvent } from "react";
// import { useTodosHandler } from "../TodosProvider/TodosProvider.tsx";
import discardChangesIcon from "/icons/discard.svg";
import saveChangesIcon from "/icons/save.svg";
import clsx from "clsx";

type TodoOverlayProps = {
	initialContent: string;
	onClose: () => void;
	onSaveChanges: (nextContent: string) => void;
	isHidden: boolean;
};

export function TodoOverlay({
	initialContent,
	onClose,
	onSaveChanges,
	isHidden,
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
	const buttonStyles =
		"bg-cool-gray p-4 rounded-lg flex justify-center items-center";
	return (
		<>
			<div
				className={clsx("-top-full opacity-0 transition-all delay-200",{
					"z-1 fixed top-0 bottom-0 left-0 right-0 bg-black opacity-30":
						!isHidden,
				})}
			/>
			<div
				className={clsx(
					"fixed z-10 left-4 right-4 lg:left-40 lg:right-40 -top-full m-auto border-gray-300 rounded-lg transition-all delay-200 sm:flex sm:justify-between lg:w-1/2",
					{
						"top-10": !isHidden,
					},
				)}
			>
				<textarea
					className="h-96 w-full resize-none outline-none rounded-lg p-4 sm:w-10/12"
					name="todo content"
					id=""
					value={content}
					onChange={handleChange}
				/>
				<div className="flex justify-between items-center mt-4 bg-white rounded-lg p-2 sm:flex-col sm:self-start sm:mt-0 gap-4 sm:m-auto ">
					<button
						className={`${buttonStyles} hoverGreen`}
						type="button"
						onClick={handleSave}
					>
						<img src={saveChangesIcon} alt="save changes" />
					</button>
					<button
						className={`${buttonStyles} hoverCinnabar`}
						type="button"
						onClick={handleDiscard}
					>
						<img src={discardChangesIcon} alt="discard changes" />
					</button>
				</div>
			</div>
		</>
	);
}
