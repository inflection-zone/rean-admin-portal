<script lang="ts">
	import Icon from "$lib/components/icon.svelte";


	export let optionValueStore = [{ Text: '' }];

	const addOptionField = () => (optionValueStore = [...optionValueStore, { Text: '' }]);
	const removeOptionField = () =>
		(optionValueStore = optionValueStore.slice(0, optionValueStore.length - 1));
</script>

<div class="border dark:border-surface-700 flex flex-col rounded my-2 p-2 gap-2">
	{#each optionValueStore as v, i}
		<div class="flex items-center gap-2">
			<input
				type="text"
				class="input"
				name="options"
				bind:value={optionValueStore[i].Text}
				placeholder="Add option here..."
			/>
			<button class="btn p-2 px-0 variant-soft-error h-10" on:click={removeOptionField}>
				<Icon
				cls="stroke-error-500 stroke-2 fill-none"
				h="100%" w="100%" iconPath='/images/others/cancel.svg#icon'/>
			</button>
		</div>
	{/each}

	<button class="btn btn-sm variant-soft-secondary" on:click|preventDefault={addOptionField}>
		Add Option
	</button>
</div>
