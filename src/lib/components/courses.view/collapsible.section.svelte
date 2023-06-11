<script lang="ts">
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import {
		faAngleDown,
		faAngleUp,
		faPencil,
		faPlus,
		faTrash
	} from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';

	///////////////////////////////////////////////////////////////////////////////////////////////

	export let headerText;
	export let itemsCount;
	export let addRoute = undefined;
	export let editRoute = undefined;
	export let src = undefined;
	export let viewRoute = undefined;
	let expanded = false;
	const dispatch = createEventDispatcher();
	const handlelDeleteClick = async (id) => dispatch('onDeleteClick', { id: id });
</script>

<div class="border border-secondary-100 p-2 min-w-[500px]">
	<div class="flex gap-4 items-center">
		<div class="flex gap-2 items-center grow">
			<img class="w-8" {src} alt="" />
			<a href={viewRoute}>{headerText}</a>
		</div>
		<p>{itemsCount}</p>
		<a href={addRoute} class="btn btn-icon-sm -my-1 hover:variant-soft-primary">
			<Fa icon={faPlus} />
		</a>
		<a href={editRoute} class="btn btn-icon-sm -my-1 hover:variant-soft-primary">
			<Fa icon={faPencil} />
		</a>
		<div>
			<Confirm
				confirmTitle="Delete"
				cancelTitle="Cancel"
				let:confirm={confirmThis}
				on:delete={(id) => handlelDeleteClick(id)}
			>
				<button
					on:click|once={(id) => confirmThis(handlelDeleteClick, id)}
					class="btn btn-icon-sm -my-1 hover:variant-soft-error"
				>
					<Fa icon={faTrash} />
				</button>
				<div slot="title">Delete</div>
				<div slot="description">Are you sure you want to delete a content?</div>
			</Confirm>
		</div>
		<button
			class="btn btn-icon-sm -my-1 hover:variant-soft-secondary "
			on:click={() => (expanded = !expanded)}
		>
			{#if expanded === false}
				<Fa icon={faAngleDown} />
			{:else}
				<Fa icon={faAngleUp} />
			{/if}
		</button>
	</div>

	{#if expanded}
		<div class="mt-2 p-2" transition:slide><slot /></div>
	{/if}
</div>
