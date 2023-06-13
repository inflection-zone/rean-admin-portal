<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import {
		Paginator,
		createDataTableStore,
		dataTableHandler,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let drugs = data.drug;
	drugs = drugs.map((item, index) => ({ ...item, index: index + 1 }));

	const userId = $page.params.userId;
	const drugRoute = `/users/${userId}/drugs`;
	const editRoute = (id) => `/users/${userId}/drugs/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/drugs/${id}/view`;
	const createRoute = `/users/${userId}/drugs/create`;

	const breadCrumbs = [{ name: 'Drugs', path: drugRoute }];

	let drugName = undefined;
	let genericName = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const dataTableStore = createDataTableStore(drugs, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	async function searchdrug(model) {
		let url = `/api/server/drugs/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (drugName) url += `&drugName=${drugName}`;
		if (genericName) url += `&genericName=${genericName}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		drugs = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(drugs);
	}
	$: if (browser) searchdrug({ drugName: drugName, genericName: genericName });

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleDrugDelete = async (e, id) => {
		const drugId = id;
		await Delete({
			sessionId: data.sessionId,
			drugId
		});
		window.location.href = drugRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/drugs`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input
		type="text"
		placeholder="Search by Drug Name"
		bind:value={drugName}
		class="input w-auto grow"
	/>
	<input
		type="text"
		placeholder="Search by Generic Name"
		bind:value={genericName}
		class="input w-auto grow"
	/>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="my-2 table-container !border !border-secondary-100">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="DrugName">Name</th>
				<th data-sort="GenericName">Generic Name</th>
				<th>Ingredients</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href={viewRoute(row.id)}>{Helper.truncateText(row.DrugName, 20)}</a>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">
						{Helper.truncateText(row.GenericName, 40)}
					</td>
					<td role="gridcell" aria-colindex={4} tabindex="0">
						{Helper.truncateText(row.Ingredients, 40)}
					</td>
					<td role="gridcell" aria-colindex={5} tabindex="0">
						{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td
					>
					<td>
						<a href={editRoute(row.id)} class="btn p-2 -my-1 hover:variant-soft-primary">
							<Icon icon="material-symbols:edit-outline" class="text-lg" />
						</a>
					</td>
					<td>
						<Confirm
							confirmTitle="Delete"
							cancelTitle="Cancel"
							let:confirm={confirmThis}
							on:delete={(e) => handleDrugDelete(e, row.id)}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleDrugDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>
							<span slot="title"> Delete </span>
							<span slot="description"> Are you sure you want to delete a drug? </span>
						</Confirm>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	{#if $dataTableStore.pagination}
		<Paginator bind:settings={$dataTableStore.pagination} buttonClasses="btn-icon bg-surface-500" />
	{/if}
</div>
