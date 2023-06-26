<script lang="ts">
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import {
		Paginator,
		createDataTableStore,
		dataTableHandler,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { browser } from '$app/environment';

	///////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const userId = $page.params.userId;
	const careplansRoute = `/users/${userId}/careplans`;
	const createRoute = `/users/${userId}/careplans/create`;
	const editRoute = (id) => `/users/${userId}/careplan/careplans/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/careplan/careplans/${id}/view`;

	let name = undefined;
	let categoryId = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	let carePlans = data.careplans;
	let careplanCategories = data.careplanCategories;

	const breadCrumbs = [
		{
			name: 'Careplan',
			path: careplansRoute
		}
	];

	carePlans = carePlans.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(carePlans, {
		sort: '',
		search: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	async function searchApiClient(model) {
		let url = `/api/server/careplan/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (name) url += `&name=${name}`;
		if (categoryId == 'Category') {
			url;
		} else {
			url += `&categoryId=${categoryId}`;
		}

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		carePlans = response.map((item, index) => ({ ...item, index: index + 1 }));
		dataTableStore.updateSource(carePlans);
	}

	dataTableStore.subscribe((model) => dataTableHandler(model));
	$: if (browser) searchApiClient({ name: name, categoryId: categoryId });

	const handleCareplanDelete = async (e, id) => {
		const careplanId = id;
		await Delete({
			sessionId: data.sessionId,
			careplanId
		});
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/careplans`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response', response);
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by Name" bind:value={name} class="input w-auto grow" />
	<select class="select w-auto grow" bind:value={categoryId}>
		<option disabled selected>Category</option>
		{#each careplanCategories as category}
			<option value={category.id}>{category.Type}</option>
		{/each}
	</select>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="Name">Name</th>
				<th data-sort="Code">Code</th>
				<th>Type</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href={viewRoute(row.id)}>{row.Name}</a>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">{row.Code}</td>
					<td role="gridcell" aria-colindex={4} tabindex="0">{row.Type}</td>
					<td>
						<a class="btn p-2 hover:variant-soft-secondary" href={editRoute(row.id)}>
							<Icon icon="material-symbols:edit-outline" class="text-lg" />
						</a>
					</td>
					<td>
						<Confirm
							confirmTitle="Delete"
							cancelTitle="Cancel"
							let:confirm={confirmThis}
							on:delete={(e) => {
								handleCareplanDelete(e, row.id);
							}}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleCareplanDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>

							<span slot="title"> Delete </span>
							<span slot="description"> Are you sure you want to delete care plan? </span>
						</Confirm>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	{#if $dataTableStore.pagination}
		<Paginator
			bind:settings={$dataTableStore.pagination}
			buttonClasses="btn-icon bg-surface-50 dark:bg-surface-900"
		/>
	{/if}
</div>
