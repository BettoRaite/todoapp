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
    <div className="flex flex-col mb-4 h-max overflow-hidden">
      <div className="grid grid-cols-[max-content_60%] gap-4 p-2 rounded-md bg-white w-full transition-all delay-100">
        <div>
          <button
            onClick={handleDone}
            className={clsx(
              " bg-maize p-4 rounded-lg transition-all duration-200 float-left",
              {
                "pb-20 bg-pumpkin shadow-md shadow-cool-gray": todo.isDone,
              }
            )}
          >
            <img
              src={todo.isDone ? doneIcon : checkIcon}
              alt="change todo to done"
            />
          </button>
        </div>

        <p className="mt-2 first-letter:uppercase max-w-full break-words text-light-gray text-lg font-bold">
          {todo.content.slice(0, 50)}
        </p>
      </div>

      <div
        className={clsx(
          "w-full mt-4 self-start flex gap-2 rounded sm:w-2/12 h-12",
          {
            "justify-items-end": todo.isDone,
          }
        )}
      >
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
