<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { showRenewApiKeyModal } from '../../store/general.store';
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	export let userName = undefined;
	export let password = undefined;
	export let validFrom = undefined;
	export let validTill = undefined;
	let dialog;

	$: if (dialog && $showRenewApiKeyModal) dialog.showModal();

	const dispatch = createEventDispatcher();

	const handlelSubmitClick = async (userName: string, password: string, validFrom, validTill) => {
		dispatch('updateApiKey', {
			userName: userName,
			password: password,
			validFrom,
			validTill
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class=""
	bind:this={dialog}
	on:close={() => showRenewApiKeyModal.set(false)}
	on:click|self={() => dialog.close()}
>
	<div>
		<form
			action="?/getApiKey"
			method="POST"
			class="w-full bg-tertiary-500 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full h-14 rounded-t-lg p-3 bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Update Api Key
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
				<span class="">Client Code *</span>
				<input
					class="input"
					name="userName"
					type="text"
					bind:value={userName}
					placeholder="Enter user name here..."
				/>
			</label>
			<label class="label mx-5 mt-4">
				<span>Password *</span>
				<input
					class="input"
					type="password"
					name="password"
					bind:value={password}
					placeholder="Enter password here..."
				/>
			</label>

			<label class="label mx-5 mt-4">
				<span>Valid From</span>
				<input
					class="input"
					type="date"
					name="validFrom"
					bind:value={validFrom}
					placeholder="Enter valid form date here..."
				/>
			</label>
			<label class="label mx-5 mt-4">
				<span>Valid Till</span>
				<input
					class="input"
					type="date"
					name="validTill"
					bind:value={validTill}
					placeholder="Enter valid to date here..."
				/>
			</label>
			<div class="flex justify-end gap-6">
				<button
					type="button"
					class="btn variant-ringed-primary text-primary-500 w-full ml-5 mt-5 mb-8 "
					on:click={() => dialog.close()}>Close</button
				>
				<button
					type="button"
					class="btn variant-filled-secondary w-full mr-5 mt-5 mb-8"
					on:click={async () => {
						await handlelSubmitClick(userName, password, validFrom, validTill);
						await dialog.close();
					}}>Submit</button
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
