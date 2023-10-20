<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '$lib/components/icon.svelte';

	const userId = $page.params.userId;
	const careplanId = $page.params.careplanId;
	const editRoute = `/users/${userId}/careplan/careplans/${careplanId}/edit`;
	const viewRoute = `/users/${userId}/careplan/careplans/${careplanId}/view`;
	const careplansRoute = `/users/${userId}/careplan/careplans`;
	const schedulingRoute = `/users/${userId}/careplan/careplans/${careplanId}/scheduling`;

	export let data: PageServerData;
	let code = data.careplan.Code;
	let categoryId = data.careplan.CategoryId;
	let name = data.careplan.Name;
	let description = data.careplan.Description !== null ? data.careplan.Description : 'Not specified';
	let tags_ = data.careplan.Tags;
	let tags = tags_.join(', ');
	let version = data.careplan.Version;
	let careplanCategories = data.careplanCategories;
	console.log(`Careplans = ${JSON.stringify(data.careplanCategories)}`);
	const category = careplanCategories.filter((carePlanCategory) => {
		return carePlanCategory.id === categoryId;
	});

	const breadCrumbs = [
		{
			name: 'Careplan',
			path: careplansRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={schedulingRoute} class="btn variant-filled-secondary ml-auto">Scheduling</a>
	<a href={editRoute} class="btn variant-filled-secondary w-22 h-10 px-0">
		<div class="flex items-center">
			<Icon
			cls="stroke-surface-100 stroke-2 fill-none"
			h="100%" w="100%" iconPath='/images/others/edit.svg#icon'/>
			<span class="pr-4">Edit</span>
	</a>
</div>
<div class="table-container my-2 border border-secondary-100 dark:!border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Careplan</th>
				<th class="text-end">
					<a href={careplansRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
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
				<td>Code</td>
				<td>{code}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Category</td>
				<td>{category[0].Type}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Tags</td>
				<td>
					{#if tags.length <= 0}
						<span class="span">Tags not specified</span>
					{:else}
						<span class="span">{tags}</span>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Version</td>
				<td>{version}</td>
			</tr>
		</tbody>
	</table>
</div>
