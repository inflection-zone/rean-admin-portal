<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
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
	let symptomData = data.symptoms;
	symptomData = symptomData.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(symptomData, {
		search: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	const userId = $page.params.userId;
	const symptomRoute = `/users/${userId}/symptoms`;
	const editRoute = (id) => `/users/${userId}/symptoms/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/symptoms/${id}/view`;
	const createRoute = `/users/${userId}/symptoms/create`;

	const breadCrumbs = [{ name: 'Symptoms', path: symptomRoute }];

	let symptom = undefined;
	let tags = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	async function searchSymptom(model) {
		let url = `/api/server/symptoms/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (symptom) url += `&symptom=${symptom}`;
		if (tags) url += `&tags=${tags}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();

		symptomData = response.map((item, index) => ({ ...item, index: index + 1 }));
		dataTableStore.updateSource(symptomData);
	}
	$: if (browser) searchSymptom({ symptom, tags });

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleSymptomDelete = async (e, id) => {
		const symptomId = id;
		await Delete({
			sessionId: data.sessionId,
			symptomId: symptomId
		});
		window.location.href = symptomRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/symptoms`, {
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
		placeholder="Search by symptom"
		bind:value={symptom}
		class="input w-auto grow"
	/>
	<input type="text" placeholder="Search by tags" bind:value={tags} class="input w-auto grow" />
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="Symptom">Symptom</th>
				<th data-sort="Tags">Tags</th>
				<th>Image</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href={viewRoute(row.id)}>{Helper.truncateText(row.Symptom, 20)}</a>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">{row.Tags}</td>
					<td role="gridcell" aria-colindex={4} tabindex="0">
						<!-- svelte-ignore missing-declaration -->
						<Image cls="flex h-10 w-10 rounded-lg" source={row.ImageUrl} w="24" h="24" />
					</td>
					<td role="gridcell" aria-colindex={5} tabindex="0">
						{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}
					</td>
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
							on:delete={(e) => handleSymptomDelete(e, row.id)}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleSymptomDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>
							<span slot="title">Delete</span>
							<span slot="description">Are you sure you want to delete a symptom?</span>
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
