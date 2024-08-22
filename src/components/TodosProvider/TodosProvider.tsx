/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";
import { TodoAction } from "../../lib/todosReducer.ts";
import { TodoItem } from "../../lib/types.ts";
import { todosReducer } from "../../lib/todosReducer.ts";

const TodosContext = createContext<TodoItem[] | null>(null);
const TodosDispatchContext = createContext<Dispatch<TodoAction> | null>(null);

export function useTodos() {
  return useContext(TodosContext) ?? [];
}

const dispatchFallback = () => {
  console.error("TodosDispatchContext has the value of null.");
};

export function useTodosDispatch() {
  return useContext(TodosDispatchContext) ?? dispatchFallback;
}

export function useTodosHandler() {
  const dispatch = useTodosDispatch();
  return {
    add(content: string) {
      dispatch({
        type: "add_todo",
        content,
      });
    },
    addInline(content: string, id: string) {
      dispatch({
        type: "add_inline_todo",
        content,
        id,
      });
    },
    delete(id: string) {
      dispatch({
        type: "delete_todo",
        id,
      });
    },
    change(todo: TodoItem) {
      dispatch({
        type: "change_todo",
        ...todo,
      });
    },
  };
}

export function TodosProvider({
  children,
  initialTodos,
}: {
  children: ReactNode;
  initialTodos: TodoItem[];
}) {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}
