<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import Icon from '$lib/components/icon.svelte';

	//////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let name = data.query.Name;
	let description = data.query.Description !== null ? data.query.Description : 'Not specified';
	let query = data.query.Query;
  let tags = data.query.Tags.length > 0 ? data.query.Tags : "Not specified"; 

	const userId = $page.params.userId;
	const queryId = $page.params.id;
	const viewRoute = `/users/${userId}/custom-queries/${queryId}/view`;
	const editRoute = `/users/${userId}/custom-queries/${queryId}/edit`;
	const queryRoute = `/users/${userId}/custom-queries`;

	const breadCrumbs = [
		{
			name: 'Custom Queries',
			path: queryRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />
<div class="flex flex-wrap gap-2">
	<a href={editRoute} class="btn variant-filled-secondary ml-auto w-22 h-10 px-0">
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
				<th>View Query</th>
				<th class="text-end">
					<a href={queryRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
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
				<td>Query</td>
				<td>{query}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Tags</td>
				<td>{tags}</td>
			</tr>
		</tbody>
	</table>
</div>
