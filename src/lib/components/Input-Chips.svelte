<script lang="ts">
	import { slide } from 'svelte/transition';

	export let value: string[] = [];
	export let name: string = '';
	export let id: string = '';
	export let chips = '';

	let input: string;

	const addChip = () => {
		if (input.trim() === '') return;

		value = [...value, input.trim()];
		input = '';
	};

	const removeChip = (chip: string) => {
		value = value.filter((item) => item !== chip);
	};
</script>

<div
	class="flex flex-col gap-2 bg-surface-100 border border-surface-200 p-2 rounded-md hover:bg-surface-50 transition"
>
	<input
		class="input input-sm"
		type="text"
		placeholder="Type and press enter to add a chip"
		bind:value={input}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				addChip();
			}
		}}
		{name}
		{id}
	/>

	{#if value.length}
		<div class="flex flex-wrap gap-2" transition:slide>
			{#each value as chip, i}
				<button class="btn btn-sm {chips}" on:click|preventDefault={() => removeChip(chip)}>
					{chip} x
				</button>
			{/each}
		</div>
	{/if}
</div>
