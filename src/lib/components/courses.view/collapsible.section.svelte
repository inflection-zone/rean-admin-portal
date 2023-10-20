<script lang="ts">
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import Icon from '../icon.svelte';
	
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

<div class="border border-secondary-100 dark:border-surface-700 p-2 min-w-[500px]">
	<div class="flex gap-4 items-center">
		<div class="flex gap-2 items-center grow">
			<Icon
				cls="stroke-slate-800"
				h="100%" w="100%" iconPath={src}/>
			<a href={viewRoute}>{headerText}</a>
		</div>
		<p>{itemsCount}</p>
		<a href={addRoute} class="btn p-2 -my-1 hover:variant-soft-primary">
			<Icon
				cls="stroke-slate-800 hover:stroke-primary-500 stroke-2 fill-none"
				h="100%" w="100%" iconPath='/images/others/add.svg#icon'/>
		</a>
		<a href={editRoute} class="btn px-0 -my-2 hover:variant-soft-primary">

			<Icon
				cls="stroke-slate-800 hover:stroke-primary-500 stroke-2 fill-none"
				h="100%" w="100%" iconPath='/images/others/edit.svg#icon'/>
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
					class="btn px-0 -my-2 hover:variant-soft-error"
					>
					<Icon
						cls="stroke-slate-800 hover:stroke-slate-500 stroke-2 fill-none"
						h="100%" w="100%" iconPath='/images/others/delete.svg#icon'/>
				</button>
				<div slot="title">Delete</div>
				<div slot="description">Are you sure you want to delete, this will leads to loss of data in course?</div>
			</Confirm>
		</div>
		<button
			class="btn px-0 -my-2 pl-4 hover:variant-soft-secondary "
			on:click={() => (expanded = !expanded)}
		>
			{#if expanded === false}
				<Icon
						cls="stroke-slate-800 hover:stroke-slate-500 stroke-2 fill-none item-center"
						h="60%" w="60%" iconPath='/images/others/arrow-down.svg#icon'/>	
			{:else}
			<Icon
						cls="stroke-slate-800 hover:stroke-slate-500 stroke-2 fill-none item-center"
						h="60%" w="60%" iconPath='/images/others/arrow-up.svg#icon'/>	
			{/if}
		</button>
	</div>

	{#if expanded}
		<div class="mt-2 p-2" transition:slide><slot /></div>
	{/if}
</div>
