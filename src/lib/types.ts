export type TodoItem = {
	id: string;
	content: string;
	isDone: boolean;
	index?: number;
	isShadowTodo?: boolean;
};
