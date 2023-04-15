<script>
	import { createEventDispatcher } from 'svelte';
	import { showModal } from '../../store/general.store';
	export let userName = undefined;
	export let password = undefined;
	let dialog; // HTMLDialogElement

	$: if (dialog && $showModal) dialog.showModal();

	const dispatch = createEventDispatcher();
	const handlelSubmitClick = async (userName, password) => {
		dispatch('submit', {
			userName: userName,
			password: password
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class=""
	bind:this={dialog}
	on:close={() => showModal.set(false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation class="w-full">
		<slot name="header" />
		<hr />
		<h3 class="text-primary-500 mb-6">Get api key</h3>
		<form action="?/getApiKey" method="POST">
			<label class="label mb-4">
				<span class="">User Name</span>
				<input
					class="input"
					name="userName"
					type="text"
					bind:value={userName}
					placeholder="Enter name..."
				/>
			</label>
			<label class="label">
				<span>Password</span>
				<input
					class="input"
					type="password"
					name="password"
					bind:value={password}
					placeholder="Enter email address..."
				/>
			</label>
		</form>
		<slot />
		<hr />
		<div class="flex gap-6 mt-4">
			<button class="btn variant-filled-error text-left " on:click={() => dialog.close()}
				>close</button
			>
			<button
				class="btn variant-filled-primary text-right"
				on:click={() => handlelSubmitClick(userName, password)}>submit</button
			>
		</div>
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
