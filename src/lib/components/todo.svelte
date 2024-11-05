<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { fly, slide } from 'svelte/transition';
	import { Trash2 } from 'lucide-svelte';
	import type { Todo } from '$lib/server/schema';

	interface Props {
		todo: Todo;
		toggleTodo: (id: number, completed: boolean | 'indeterminate') => void;
		deleteTodo: (id: number) => void;
	}

	let { todo, toggleTodo, deleteTodo }: Props = $props();
	let completed = $state(todo.completed);
</script>

<li
	class="flex items-center justify-between w-full p-2 pl-3 space-x-2 border rounded-lg border-slate-700 {completed
		? 'bg-slate-700'
		: 'bg-slate-900'}"
	in:fly={{ y: -20 }}
	out:slide
>
	<Label class="flex items-center w-11/12 gap-2 hover:cursor-pointer">
		<Checkbox bind:checked={completed} onCheckedChange={(v) => toggleTodo(todo.id, v)} />
		{todo.name}
	</Label>
	<Button type="button" size="icon" variant="ghost" onclick={() => deleteTodo(todo.id)}>
		<Trash2 class="w-4 h-4" />
	</Button>
</li>
