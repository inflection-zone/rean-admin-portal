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
	let id = data.drug.id;
	let drugName = data.drug.DrugName;
	let genericName = data.drug.GenericName;
	let ingredients = data.drug.Ingredients;
	let strength = data.drug.Strength;
	let commercialNames = data.drug.OtherCommercialNames;
	let manufacturer = data.drug.Manufacturer;
	let otherInformation = data.drug.OtherInformation;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

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
	<a href={editRoute} class="btn variant-filled-secondary ml-auto">
		<span><Fa icon={faPen} size="sm" /></span>
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Drug</th>
				<th class="text-end">
					<a href={drugRoute} class="btn btn-icon-sm variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Name</td>
				<td>{drugName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Generic Name</td>
				<td>{genericName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Ingredients</td>
				<td>{ingredients}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Strength</td>
				<td>{strength}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Commercial Name</td>
				<td>{commercialNames}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Manufacture</td>
				<td>{manufacturer}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Other Information</td>
				<td>{otherInformation}</td>
			</tr>
		</tbody>
	</table>
</div>

