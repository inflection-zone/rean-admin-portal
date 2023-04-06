<script lang="ts">
	import Fa from 'svelte-fa';
	import { faAngleDown, faAngleUp, faEdit, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	export let headerText;
	export let color = '';
	export let paddingBottom = `${12}px`;
	export let paddingTop = `${12}px`;
	export let paddingLeft = `${20}px`;
	export let paddingRight = `${20}px`;
	export let marginBottom = `${10}px`;
	export let itemsCount;
	export let id = undefined;
  export let addRoute = undefined;
	export let editRoute = undefined;
	let expanded = false;
	const dispatch = createEventDispatcher();
	const handlelDeleteClick = async (id) => {
		dispatch('onDeleteClick', {
			courseId: id
		});
	};

  const handlelAddClick = async () => {
    dispatch('onAddClick', 
    goto(`${addRoute}`));
	};
</script>

<div class="collapsible pb-1 ml-3 first:pt-4 ">
	<!-- <h3> -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span
		
		style="--color:{color}; --paddingBottom:{paddingBottom}; --paddingTop:{paddingTop}; --paddingLeft:{paddingLeft}; paddingRight:{paddingRight};--marginBottom:{marginBottom};"
		class="text-lg text-white pr-6"
	>
  <!-- <div class="flex gap-4"> -->
		<!-- <div class="w-5"> -->
		{headerText}
		<!-- </div> -->
	<div class="flex gap-6">
		<div class="text-white text-center pr-0">
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
    <div>
		<button class="h-4 w-2 mx-0" on:click = {handlelDeleteClick(id)}>
			<Fa icon={faTrash} />
		</button>
    </div>
		<svg aria-expanded={expanded}
		on:click={() => (expanded = !expanded)} viewBox="0 0 20 20" fill="none" class="pt-1 pr-3 h-4 w-2">
			{#if expanded == false}
				<Fa class="vert" icon={faAngleDown} />
			{:else}
				<Fa icon={faAngleUp} />
			{/if}
		</svg>
  </div>
	</span>
	<!-- </h3> -->
	<div class="content " hidden={!expanded}>
		<slot />
	</div>
</div>

<style>
	.collapsible {
		border-radius: 20px;
	}
	h3 {
		margin: 0;
	}
	span {
		display: flex;
		justify-content: space-between;
		width: 96%;
		/* border: 2px; */
		border-radius: 9px;
		/* margin: 13px; */
		margin-bottom: var(--marginBottom);
		margin-left: 23px;
		background: var(--color);
		padding-bottom: var(--paddingBottom);
		padding-top: var(--paddingTop);
		padding-left: var(--paddingLeft);
		padding-right: var(--paddingRight);
		/* padding: 1em 0.5em; */
	}
	svg {
		height: 1.4em;
		width: 1.4em;
		margin-right: 5px;
	}
</style>
