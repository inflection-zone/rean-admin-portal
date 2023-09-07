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
	let apiClients = data.apiClients;

	apiClients = apiClients.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(apiClients, {
		sort: '',
		search: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/api-clients/create`;
	const editRoute = (id) => `/users/${userId}/api-clients/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/api-clients/${id}/view`;
	const apiClientRoute = `/users/${userId}/api-clients`;

	const breadCrumbs = [
		{
			name: 'Clients',
			path: apiClientRoute
		}
	];

	let clientName = undefined;
	let contactEmail = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	async function searchApiClient(model) {
		let url = `/api/server/api-client/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (clientName) url += `&clientName=${clientName}`;
		if (contactEmail) url += `&clientEmail=${contactEmail}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		apiClients = response.map((item, index) => ({ ...item, index: index + 1 }));
		dataTableStore.updateSource(apiClients);
	}
	$: if (browser) searchApiClient({ clientName: clientName, contactEmail: contactEmail });

	const handleApiClientDelete = async (e, id) => {
		const clientId = id;

		await Delete({
			sessionId: data.sessionId,
			apiClientId: clientId
		});
		window.location.href = apiClientRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/api-client`, {
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
		name="clientName"
		placeholder="Search by Name"
		bind:value={clientName}
		class="input w-auto grow"
	/>
	<input
		type="text"
		name="email"
		placeholder="Search by Email"
		bind:value={contactEmail}
		class="input w-auto grow"
	/>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="ClientName">Name</th>
				<th data-sort="Email">Email</th>
				<th>Phone</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href={viewRoute(row.id)}>{Helper.truncateText(row.ClientName, 20)}</a>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">{row.Email}</td>
					<td role="gridcell" aria-colindex={4} tabindex="0">{row.Phone}</td>
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
								handleApiClientDelete(e, row.id);
							}}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleApiClientDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>

							<span slot="title"> Delete </span>
							<span slot="description"> Are you sure you want to delete a client? </span>
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
