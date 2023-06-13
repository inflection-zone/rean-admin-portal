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
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let organizations = data.organization;
	let index = Number;
	const userId = $page.params.userId;
	organizations = organizations.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(organizations, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	const organizationRoute = `/users/${userId}/organizations`;
	const createRoute = `/users/${userId}/organizations/create`;
	const editRoute = (id) => `/users/${userId}/organizations/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/organizations/${id}/view`;
	const breadCrumbs = [{ name: 'Organizations', path: organizationRoute }];

	let type = undefined;
	let name = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	async function searchOrganization(model) {
		let url = `/api/server/organizations/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (type) url += `&type=${type}`;
		if (name) url += `&name=${name}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		organizations = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(organizations);
	}
	$: if (browser) searchOrganization({ type: type, name: name });

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleOrganizationsDelete = async (e, id) => {
		const organizationId = id;
		console.log('organizationId', organizationId);

		await Delete({
			sessionId: data.sessionId,
			organizationId: organizationId
		});

		window.location.href = organizationRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/organizations/delete`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by name" bind:value={name} class="input w-auto grow" />
	<input type="text" placeholder="Search by type" bind:value={type} class="input w-auto grow" />
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="my-2 table-container !border !border-secondary-100">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="Type">Type</th>
				<th data-sort="Name">Name</th>
				<th>Phone</th>
				<th>Email</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href={viewRoute(row.id)}>{Helper.truncateText(row.Type, 20)}</a>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">{Helper.truncateText(row.Name, 20)}</td
					>
					<td role="gridcell" aria-colindex={4} tabindex="0">{row.ContactPhone}</td>
					<td role="gridcell" aria-colindex={5} tabindex="0">{row.ContactEmail}</td>
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
								handleOrganizationsDelete(e, row.id);
							}}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleOrganizationsDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>

							<span slot="title"> Delete </span>
							<span slot="description"> Are you sure you want to delete a organization? </span>
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
