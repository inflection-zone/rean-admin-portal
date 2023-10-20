<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import Icon from '$lib/components/icon.svelte';

	////////////////////////////////////////////////////////

	export let data: PageServerData;
	let drug = data.drug;
	let id = drug.id;
	let drugName = drug.DrugName;
	let genericName = drug.GenericName !== null ? drug.GenericName : 'Not specified';
	let ingredients = drug.Ingredients !== null ? drug.Ingredients : 'Not specified';
	let strength = drug.Strength !== null ? drug.Strength : 'Not specified';
	let commercialNames = drug.OtherCommercialNames !== null ? drug.OtherCommercialNames : 'Not specified';
	let manufacturer = drug.Manufacturer !== null ? drug.Manufacturer : 'Not specified';
	let otherInformation = drug.OtherInformation !== null ? drug.OtherInformation: 'Not specified';

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/drugs/${id}/edit`;
	const viewRoute = `/users/${userId}/drugs/${id}/view`;
	const drugRoute = `/users/${userId}/drugs`;

	const breadCrumbs = [
		{
			name: 'Drugs',
			path: drugRoute
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
		</div>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Drug</th>
				<th class="text-end">
					<a href={drugRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
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
				<td>{drugName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Generic Name</td>
				<td>{genericName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Ingredients</td>
				<td>{ingredients}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Strength</td>
				<td>{strength}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Commercial Name</td>
				<td>{commercialNames}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Manufacture</td>
				<td>{manufacturer}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Other Information</td>
				<td>{otherInformation}</td>
			</tr>
		</tbody>
	</table>
</div>
