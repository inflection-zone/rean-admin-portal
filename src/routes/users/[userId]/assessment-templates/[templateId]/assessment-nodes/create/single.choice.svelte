<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';

	export let show = false;
	export let optionValueStore = [
		{
			Text: ''
		}
	];

	const addOptionField = () => {
		optionValueStore = [...optionValueStore, { Text: '' }];
	};

	const removeOptionField = () => {
		optionValueStore = optionValueStore.slice(0, optionValueStore.length - 1);
	};

	const handleFocus = () => {
		show = true;
	};
</script>

<div class="flex items-start mt-4 mx-16">
	<div class="w-1/3">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label mt-2">
			<span>Options</span>
		</label>
	</div>
	<div class="w-2/3">
		<div class="border-2 border-solid card bg-[#ffffff] h-auto rounded-lg">
			<div class=" form-control my-2 flex flex-col pl-3">
				{#each optionValueStore as v, i}
					<div class="relative flex flex-row pt-2">
						<span class="font-semibold text-primary-500 pr-2 pt-2">{i + 1} </span>
						<input
							type="text"
							class="input ml-2 w-11/12"
							name="options"
							on:focus={handleFocus}
							bind:value={optionValueStore[i].Text}
							placeholder="Add option here..."
						/>
						<button class="absolute right-8 pt-3" type="button" on:click={removeOptionField}>
							<Fa icon={faMultiply} size="md" class="text-primary-500" />
						</button>
					</div>
				{/each}
			</div>
			<div>
				<div class="flex justify-start pl-10 mb-2">
					{#if show}
						<button
							class="btn variant-ringed-primary btn-sm"
							type="button"
							on:click|preventDefault={addOptionField}>Add Option</button
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
