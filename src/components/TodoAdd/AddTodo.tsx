import { useState, ChangeEvent } from "react";
import { useTodosHandler } from "../TodosProvider/TodosProvider.tsx";

export function TodoAdd() {
  const todosHandler = useTodosHandler();
  const [content, setContent] = useState("");

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function handleAdd() {
    if (content !== "") {
      todosHandler.add(content);
      setContent("");
    }
  }
  return (
    <section className="flex flex-col gap-4 mb-4 sm:flex-row">
      <textarea
        required={true}
        className="border-2 border-yellow-green rounded-md p-4 resize-none h-60 outline-none sm:flex-1 focus:border-cool-gray focus:border-2 transition-all delay-50"
        value={content}
        placeholder="What needs to be done?"
        onChange={handleChange}
      />
      <button
        type="button"
        className={`sm:w-1/5 bg-maize sm:self-start sm:h-20 transition-all delay-100 text-yellow-green hover:text-cool-gray active:bg-aero font-bold rounded-md pt-2 pb-2`}
        onClick={handleAdd}
      >
        Add
      </button>
    </section>
  );
}
