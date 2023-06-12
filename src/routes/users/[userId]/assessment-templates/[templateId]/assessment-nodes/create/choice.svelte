<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';

	export let optionValueStore = [{ Text: '' }];

	const addOptionField = () => (optionValueStore = [...optionValueStore, { Text: '' }]);
	const removeOptionField = () =>
		(optionValueStore = optionValueStore.slice(0, optionValueStore.length - 1));
</script>

<div class="border flex flex-col rounded my-2 p-2 gap-2">
	{#each optionValueStore as v, i}
		<div class="flex items-center gap-2">
			<input
				type="text"
				class="input"
				name="options"
				bind:value={optionValueStore[i].Text}
				placeholder="Add option here..."
			/>
			<button class="btn btn-icon-sm variant-soft-error" on:click={removeOptionField}>
				<Fa icon={faMultiply} size="md" class="text-primary-500" />
			</button>
		</div>
	{/each}

	<button class="btn btn-sm variant-soft-secondary" on:click|preventDefault={addOptionField}>
		Add Option
	</button>
</div>
