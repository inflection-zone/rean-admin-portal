<script lang="ts">
	import { slide } from 'svelte/transition';

	export let chipList: string[] = [];

	export let name: string = '';
	export let id: string = '';

	let input: string;

	const addChip = () => {
		if (input.trim() === '') return;

		chipList = [...chipList, input.trim()];
		input = '';
	};

	const removeChip = (chip: string) => {
		chipList = chipList.filter((item) => item !== chip);
	};
</script>

<div class="flex flex-col gap-2 bg-base-200 p-2 rounded">
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

	{#if chipList.length}
		<div class="flex flex-wrap gap-2" transition:slide>
			{#each chipList as chip, i}
				<button class="btn btn-sm btn-neutral hover:btn-error" on:click={() => removeChip(chip)}>
					{chip} x
				</button>
			{/each}
		</div>
	{/if}
</div>
