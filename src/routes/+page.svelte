<script lang="ts">
	import Todo from '$lib/components/todo.svelte';
	import AddTodo from '$lib/components/addTodo.svelte';
	import axios from 'axios';
	import '../app.css';

	let { data } = $props();

	const toggleTodo = async (id: number, completed: boolean | 'indeterminate') => {
		if (completed === 'indeterminate') return;
		const formData = new FormData();
		formData.append('todoId', id.toString());
		formData.append('completed', completed ? 'true' : 'false');
		await axios.post('?/toggleTodo', formData);
	};

	const deleteTodo = async (id: number) => {
		const index = data.todos.findIndex((todo) => todo.id === id);
		data = { todos: data.todos.toSpliced(index, 1) };
		const formData = new FormData();
		formData.append('todoId', id.toString());
		await axios.post('?/deleteTodo', formData);
	};
</script>

<main class="pt-40 pb-20 mx-auto max-w-80">
	<h1 class="text-xl">Welcome to Todo app with Svelte</h1>

	<AddTodo />

	<ul class="w-full space-y-2">
		{#each data.todos as todo (todo.id)}
			<Todo {todo} {toggleTodo} {deleteTodo} />
		{/each}
	</ul>
</main>
