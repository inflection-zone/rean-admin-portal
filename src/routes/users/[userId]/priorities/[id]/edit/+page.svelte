<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import { InputChip } from '@skeletonlabs/skeleton';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let form;
	export let data: PageServerData;
	let id = data.priority.id;
	let type = data.priority.Type;
	let tags = data.priority.Tags;

	//Original data
	let _type = type;
	let _tags = tags;

	function handleReset() {
		type = _type;
		tags = _tags;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/priorities/${id}/edit`;
	const viewRoute = `/users/${userId}/priorities/${id}/view`;
	const priorityRoute = `/users/${userId}/priorities`;

	const breadCrumbs = [
		{
			name: 'Priorities',
			path: priorityRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updatePriorityAction"
	class="table-container border border-secondary-100 my-2"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Health Priority</th>
				<th class="text-end">
					<a href={viewRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Type *</td>
				<td>
					<input
						type="text"
						name="type"
						required
						bind:value={type}
						placeholder="Enter type here..."
						class="input w-full {form?.errors?.type
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.type}
						<p class="text-error-500 text-xs">{form?.errors?.type[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" bind:value={tags} />
					{#if form?.errors?.tags}
						<p class="text-error-500 text-xs">{form?.errors?.tags[0]}</p>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
