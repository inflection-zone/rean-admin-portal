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
			resolutionScore: resolutionScore
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class="p-0 rounded-lg shadow-xl backdrop:bg-black/50"
	bind:this={dialog}
	on:close={() => showScoringConditionModal.set(false)}
	on:click|self={() => dialog.close()}
>
	<div class="flex items-center justify-between variant-soft-secondary py-2 px-4">
		<span class="text-xl">Update Scoring Condition</span>
		<button class="btn btn-icon-sm variant-soft-secondary" on:click={() => dialog.close()}>
			<Fa icon={faMultiply} size="lg" />
		</button>
	</div>

	<form action="?/getApiKey" method="POST" class="flex flex-col gap-2 p-4 -mt-2">
		<label>
			Resolution Score
			<input
				class="input"
				name="resolutionScore"
				type="number"
				bind:value={resolutionScore}
				placeholder="Enter resolution score here..."
			/>
		</label>

		<div class="flex justify-end gap-2">
			<button class="btn variant-soft-secondary" on:click={() => dialog.close()}>Close</button>

			<button
				class="btn variant-filled-secondary"
				on:click={async () => {
					await handlelSubmitClick(resolutionScore);
					await dialog.close();
				}}
			>
				Submit
			</button>
		</div>
	</form>
</dialog>

<style>
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
</style>
