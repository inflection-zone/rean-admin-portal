<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import Icon from '$lib/components/icon.svelte';

	///////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let labRecordType = data.labRecordType;
	let id = labRecordType.id;
	let typeName = labRecordType.TypeName;
	let displayName = labRecordType.DisplayName !== null && labRecordType.DisplayName !== "" ? labRecordType.DisplayName : 'Not specified';
	let snowmedCode = labRecordType.SnowmedCode !== null ? labRecordType.SnowmedCode : 'Not specified';
	let loincCode = labRecordType.LoincCode !== null ? labRecordType.LoincCode : 'Not specified';
	let normalRangeMin = labRecordType.NormalRangeMin !== null ? labRecordType.NormalRangeMin : 'Not specified';
	let normalRangeMax = labRecordType.NormalRangeMax !== null ? labRecordType.NormalRangeMax : 'Not specified';
	let unit = labRecordType.Unit !== null ? labRecordType.Unit : 'Not specified';

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/lab-record-types/${id}/edit`;
	const viewRoute = `/users/${userId}/lab-record-types/${id}/view`;
	const labRecordTypesRoute = `/users/${userId}/lab-record-types`;

	const breadCrumbs = [
		{
			name: 'Lab-Records',
			path: labRecordTypesRoute
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
				<th>View Lab Record</th>
				<th class="text-end">
					<a href={labRecordTypesRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
						<Icon
							cls="stroke-primary-500 stroke-2 fill-none"
							h="100%" w="100%" iconPath='/images/others/cancel.svg#icon'/>
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type Name</td>
				<td>{typeName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Display Name</td>
				<td>{displayName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>SNOMED CODE</td>
				<td>{snowmedCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>LOINC CODE</td>
				<td>{loincCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Minimum Normal Range</td>
				<td>{normalRangeMin}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Maximum Normal Range</td>
				<td>{normalRangeMax}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Unit</td>
				<td>{unit}</td>
			</tr>
		</tbody>
	</table>
</div>
