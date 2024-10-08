import { useTodos } from "../TodosProvider/TodosProvider.tsx";
import { useState, useRef, JSX } from "react";
import { InlineTodo } from "../InlineTodo/InlineTodo.tsx";
import { InlineTodoProps } from "../InlineTodo/InlineTodo.tsx";

export function InlineTodoList() {
  const [usedTodoIds, setUsedTodoIds] = useState<Record<string, number>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inlineTodosTotal, _setInlineTodosTotal] = useState(10);

  function handleUseTodoId(todoId: string, inlineTodoIndex: number) {
    setUsedTodoIds({
      ...usedTodoIds,
      [todoId]: inlineTodoIndex,
    });
  }

  const todos = useTodos();
  const inlineTodosContainerRef = useRef<HTMLElement | null>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const inlineTodos: JSX.Element[] = [];

  for (
    let inlineTodoIndex = 0;
    inlineTodoIndex < inlineTodosTotal;
    ++inlineTodoIndex
  ) {
    const todo = todos[inlineTodoIndex];

    const props: InlineTodoProps = {
      inlineTodoIndex,
      inputRefs: inputRefs,
      onUseTodoId: handleUseTodoId,
    };

    if (todo && !usedTodoIds[todo.id]) {
      props.todo = todo;
    }
    if (usedTodoIds[todo?.id] === inlineTodoIndex) {
      props.todo;
    }

    inlineTodos.push(<InlineTodo key={inlineTodoIndex} {...props} />);
  }
  return (
    <section className="p-4	 rounded bg-white">
      <div
        ref={(ref) => {
          inlineTodosContainerRef.current = ref;
          console.log(ref?.style.height);
        }}
        className={`h-${96 / 2} rounded flex flex-col`}
      >
        {inlineTodos}
      </div>
    </section>
  );
}
