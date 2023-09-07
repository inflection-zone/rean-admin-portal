<script lang="ts">
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
	let labRecordTypes = data.labRecordTypes;
	let index = Number;
	labRecordTypes = labRecordTypes.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(labRecordTypes, {
		search: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/lab-record-types/create`;
	const editRoute = (id) => `/users/${userId}/lab-record-types/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/lab-record-types/${id}/view`;
	const labRecordTypesRoute = `/users/${userId}/lab-record-types`;

	const breadCrumbs = [
		{
			name: 'Lab-Records',
			path: labRecordTypesRoute
		}
	];

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleLabRecordTypeDelete = async (e, id) => {
		const labRecordTypeId = id;
		console.log('labRecordTypeId', labRecordTypeId);
		await Delete({
			sessionId: data.sessionId,
			labRecordTypeId: labRecordTypeId
		});
		window.location.href = labRecordTypesRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/lab-record-types`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<a href={createRoute} class="btn variant-filled-secondary ml-auto">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="TypeName">Type Name</th>
				<th data-sort="DisplayName">Display Name</th>
				<th>Minimum</th>
				<th>Maximum</th>
				<th>Unit</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href={viewRoute(row.id)}>{Helper.truncateText(row.TypeName, 20)} </a>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0"
						>{Helper.truncateText(row.DisplayName !== null ? row.DisplayName : 'Not specified', 20)}
					</td>
					<td role="gridcell" aria-colindex={4} tabindex="0">{row.NormalRangeMin}</td>
					<td role="gridcell" aria-colindex={5} tabindex="0">{row.NormalRangeMax}</td>
					<td role="gridcell" aria-colindex={6} tabindex="0">{row.Unit}</td>
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
							on:delete={(e) => {
								handleLabRecordTypeDelete(e, row.id);
							}}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleLabRecordTypeDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>
							<span slot="title"> Delete </span>
							<span slot="description"> Are you sure you want to delete a lab record type? </span>
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
