<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { LoaderCircle } from 'lucide-svelte/icons';

	let isLoading = $state(false);

	function loading(): (args: { update: () => Promise<void> }) => Promise<void> {
		isLoading = true;
		return async ({ update }) => {
			await update();
			isLoading = false;
		};
	}
</script>

<form method="post" action="?/addtodo" use:enhance={loading} class="my-6 space-y-3">
	<Input
		type="text"
		name="todoName"
		placeholder="Enter todo name"
		class="max-w-96"
		autocomplete="off"
		autofocus
	/>
	<Button type="submit" disabled={isLoading}>
		{#if isLoading}
			<LoaderCircle class="w-4 h-4 mr-2 animate-spin" />
		{/if}
		Add Todo
	</Button>
</form>
