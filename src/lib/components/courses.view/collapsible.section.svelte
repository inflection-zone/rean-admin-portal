<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faAngleDown,
		faAngleUp,
		faEdit,
		faPencil,
		faPlus,
		faTrash
	} from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';

	///////////////////////////////////////////////////////////////////////////////////////////////

	export let headerText;
	export let color = '';
	export let paddingBottom = `${12}px`;
	export let paddingTop = `${12}px`;
	export let paddingLeft = `${20}px`;
	export let paddingRight = `${20}px`;
	export let marginBottom = `${10}px`;
	export let itemsCount;
	export let addRoute = undefined;
	export let editRoute = undefined;
	export let src = undefined;
	export let viewRoute = undefined;
	let expanded = false;
	const dispatch = createEventDispatcher();
	const handlelDeleteClick = async (id) => {
		dispatch('onDeleteClick', {
			id: id
		});
	};

</script>

<div class="collapsible pb-1 ml-3 first:pt-4 ">

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span 
		style="--color:{color}; --paddingBottom:{paddingBottom}; --paddingTop:{paddingTop}; --paddingLeft:{paddingLeft}; paddingRight:{paddingRight};--marginBottom:{marginBottom};"
		class="text-lg text-white pr-6 justify-start "
	>
			<div class=" flex gap-2">
			<!-- svelte-ignore a11y-missing-attribute -->
			<img class="w-8 mr-2" src = {src} />
			<a class="text-white" href= {viewRoute}>
			<div class="text-white">{headerText}</div></a>
			
		</div>
		<!-- </div> -->
		<div class="flex gap-6 justify-end">
			<div class="text-white text-center pr-0 mr-5">
				{itemsCount}
			</div>
			<div class="w-5 my-2">
				<a href={addRoute}>
					<Fa class="text-white" icon={faPlus} />
				</a>
			</div>
			<div class="w-5 my-2">
				<a href={editRoute}>
					<Fa class="text-white" icon={faPencil} />
				</a>
			</div>
			<div class="h-4 w-2 my-1">
				<Confirm
					confirmTitle="Delete"
					cancelTitle="Cancel"
					let:confirm={confirmThis}
					on:delete={(id) => {
						handlelDeleteClick(id);
					}}
				>
					<button on:click|once ={(id) => confirmThis(handlelDeleteClick, id)} class=""
						><Fa icon={faTrash} /></button
					>
					<div class="" slot="title">Delete</div>
					<div slot="description">Are you sure you want to delete a content?</div>
				</Confirm>

			</div>
			<svg
				aria-expanded={expanded}
				on:click={() => (expanded = !expanded)}
				viewBox="0 0 20 20"
				fill="none"
				class="pt-1 pr-3 h-4 w-2"
			>
				{#if expanded == false}
					<Fa class="vert" icon={faAngleDown} />
				{:else}
					<Fa icon={faAngleUp} />
				{/if}
			</svg>
		</div>
	</span>

	<div class="content" hidden={!expanded}>
		<slot />
	</div>
</div>

<style>
	.collapsible {
		border-radius: 20px;
	}

	span {
		display: flex;
		justify-content: space-between;
		width: 96%;
		border-radius: 9px;
		margin-bottom: var(--marginBottom);
		margin-left: 23px;
		background: var(--color);
		padding-bottom: var(--paddingBottom);
		padding-top: var(--paddingTop);
		padding-left: var(--paddingLeft);
		padding-right: var(--paddingRight);
	}
	svg {
		height: 1.4em;
		width: 1.4em;
		margin-right: 5px;
	}
</style>
