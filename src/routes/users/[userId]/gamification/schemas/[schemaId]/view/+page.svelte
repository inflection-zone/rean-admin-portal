<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import Icon from '$lib/components/icon.svelte';

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let name = data.schema.Name;
	let description = (data.schema.Description !== null && data.schema.Description) ? data.schema.Description : 'Not specified';
	let type = data.schema.Type;
	let eventTypes = data.schema.EventTypes;

	const userId = $page.params.userId;
  const schemaId = $page.params.schemaId;
  const editRoute = `/users/${userId}/gamification/schemas/${schemaId}/edit`;
	const viewRoute = `/users/${userId}/gamification/schemas/${schemaId}/view`;
	const schemaRoute = `/users/${userId}/gamification/schemas`;
	const nodeRoute = `/users/${userId}/gamification/schemas/${schemaId}/nodes/create`

	const breadCrumbs = [
    {
			name: 'Gamification',
			path: schemaRoute
		},
		{
			name: 'Schemas',
			path: schemaRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={nodeRoute} class="btn variant-filled-secondary ml-auto"> Add Node</a>
	<a href={editRoute} class="btn variant-filled-secondary w-22 h-10 px-0">
		<div class="flex items-center">
			<Icon
			cls="stroke-surface-100 stroke-2 fill-none"
			h="100%" w="100%" iconPath='/images/others/edit.svg#icon'/>
			<span class="pr-4">Edit</span>
	</a>
</div>
<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Schema</th>
				<th class="text-end">
					<a href={schemaRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
						<Icon
							cls="stroke-primary-500 stroke-2 fill-none"
							h="100%" w="100%" iconPath='/images/others/cancel.svg#icon'/>
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type</td>
				<td>{type}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Event Types</td>
				<td>
					<ol class="list-decimal ml-2">
						{#each eventTypes as eventType}
							<li>{eventType.Name}</li>
						{/each}
					</ol>
				</td>
			</tr>
		</tbody>
	</table>
</div>
