import styles from "./app.module.css";
import TodoList from "./components/todoList/TodoList";

window.onstorage = (event) => {
	// can also use window.addEventListener('storage', event => {
	console.log(event);
};

function App() {
	return (
		<>
			<div className={styles.todoListWrapper}>
				<TodoList />
			</div>
		</>
	);
}

export default App;
