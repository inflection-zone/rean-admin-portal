<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let id = data.labRecordType.id;
	let typeName = data.labRecordType.TypeName;
	let displayName = data.labRecordType.DisplayName;
	let snowmedCode = data.labRecordType.SnowmedCode;
	let loincCode = data.labRecordType.LoincCode;
	let normalRangeMin = data.labRecordType.NormalRangeMin;
	let normalRangeMax = data.labRecordType.NormalRangeMax;
	let unit = data.labRecordType.Unit;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

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
	<a href={editRoute} class="btn variant-filled-secondary ml-auto">
		<span><Fa icon={faPen} size="sm" /></span>
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Lab Record</th>
				<th class="text-end">
					<a href={labRecordTypesRoute} class="btn btn-icon-sm variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Type Name</td>
				<td>{typeName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Display Name</td>
				<td>{displayName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>SNOMED CODE</td>
				<td>{snowmedCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>LOINC CODE</td>
				<td>{loincCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Minimum Normal Range</td>
				<td>{normalRangeMin}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Maximum Normal Range</td>
				<td>{normalRangeMax}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Unit</td>
				<td>{unit}</td>
			</tr>
		</tbody>
	</table>
</div>
