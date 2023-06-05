<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { showScoringConditionModal } from '../../store/general.store';
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	export let resolutionScore = undefined;
	let dialog; 

	$: if (dialog && $showScoringConditionModal) dialog.showModal();

	const dispatch = createEventDispatcher();

	const handlelSubmitClick = async (resolutionScore: number) => {
		dispatch('updateScoringCondition', {
      resolutionScore: resolutionScore,
		});
	};

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class=""
	bind:this={dialog}
	on:close={() => showScoringConditionModal.set(false)}
	on:click|self={() => dialog.close()}
>
<div>
	<form
		action="?/getApiKey" method="POST"
		class="w-full bg-tertiary-500 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
	>
		<div class="w-full h-14 rounded-t-lg p-3 bg-[#7165E3]">
			<div class="ml-3 relative flex flex-row text-white text-xl">
				Update Scoring Condition
				<div on:click={() => dialog.close()}>
					<Fa
					icon={faMultiply}
					size="lg"
					class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
				/>
			</div>
			</div>
		</div>
		<label class="label mb-4 mx-5 mt-5">
			<span class="">Resolution Score *</span>
			<input
				class="input"
				name="resolutionScore"
				type="number"
				bind:value={resolutionScore}
				placeholder="Enter resolution score here..."
			/>
		</label>
		<div class="flex justify-end gap-6">
			<button type="button" class="btn variant-ringed-primary text-primary-500 w-full ml-5 mt-5 mb-8 " on:click={() => dialog.close()}
				>Close</button
			>
			<button type="button"
				class="btn variant-filled-primary w-full mr-5 mt-5 mb-8"
				on:click = {async () =>{ await handlelSubmitClick(resolutionScore)
					await dialog.close();} }
      >Submit</button
			>
		</div>
	</form>
</div>
</dialog>

<style>
	dialog {
		max-width: 72em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>