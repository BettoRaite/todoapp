import { v4 as uuidv4 } from "uuid";
import { useState, ChangeEvent, MutableRefObject, KeyboardEvent } from "react";
import { TodoItem } from "../../lib/types.ts";
import styles from "./inlineTodo.module.css";
import { useTodosHandler } from "../TodosProvider/TodosProvider.tsx";

export type InlineTodoProps = {
  todo?: TodoItem;
  inlineTodoIndex: number;
  inputRefs: MutableRefObject<HTMLInputElement[]>;
  onUseTodoId: (todoId: string, inlineTodoIndex: number) => void;
};
type status = "done" | "undone" | "section" | "";
export function InlineTodo({
  todo,
  inlineTodoIndex,
  inputRefs,
  onUseTodoId,
}: InlineTodoProps) {
  const todosHandler = useTodosHandler();
  const [content, setContent] = useState(todo ? `[-]:${todo.content}` : "");
  const [status, setStatus] = useState<status>(todo ? "undone" : "");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (value.startsWith("###")) {
      setStatus("section");
    }

    const hasUndonePrefix = value.startsWith("[-]:");
    const hasDonePrefix = value.startsWith("[+]:");

    if (hasDonePrefix) {
      setStatus("done");
    }
    if (hasUndonePrefix) {
      setStatus("undone");
    }

    if (!todo && (hasUndonePrefix || hasDonePrefix)) {
      const todoId = uuidv4();

      onUseTodoId(todoId, inlineTodoIndex);
      todosHandler.addInline(value, todoId);

      setStatus("undone");
    } else if (todo && (hasUndonePrefix || hasDonePrefix)) {
      todosHandler.change({
        ...todo,
        content: value.slice(value.indexOf(":") + 1),
        isDone: hasDonePrefix,
      });
    }
    if (!(hasDonePrefix || hasUndonePrefix) && todo) {
      todosHandler.delete(todo.id);
      setStatus("");
    }
    setContent(value);
  }
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const key = e.code;
    const directions: Record<string, number> = {
      ArrowDown: 1,
      Enter: 1,
      ArrowUp: -1,
    };
    const nextMove = directions[key];
    if (nextMove) {
      const input = inputRefs.current[inlineTodoIndex + nextMove];
      if (input) {
        input.focus();
      }
    }
  }

  return (
    <input
      ref={(ref) => {
        if (ref) {
          inputRefs.current[inlineTodoIndex] = ref;
        }
      }}
      className={`w-96 px-1 ${styles.inlineTodo} ${styles[status] ?? ""}`}
      value={content}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}
