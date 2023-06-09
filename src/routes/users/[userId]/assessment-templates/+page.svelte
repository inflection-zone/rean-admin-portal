<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		createDataTableStore,
		dataTableHandler,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { faPencil, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
	import { Helper } from '$lib/utils/helper';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let assessmentTemplates = data.assessmentTemplate;
	assessmentTemplates = assessmentTemplates.map((item, index) => ({ ...item, index: index + 1 }));

	const userId = $page.params.userId;
	const assessmentRoute = `/users/${userId}/assessment-templates`;
	const editRoute = (id) => `/users/${userId}/assessment-templates/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/assessment-templates/${id}/view`;
	const createRoute = `/users/${userId}/assessment-templates/create`;

	const breadCrumbs = [
		{
			name: 'Assessments',
			path: assessmentRoute
		}
	];

	let title = undefined;
	let type = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const dataTableStore = createDataTableStore(assessmentTemplates, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	async function searchAssessmentTemplate(model) {
		let url = `/api/server/assessment-templates/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (title) url += `&title=${title}`;
		if (type) url += `&type=${type}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		assessmentTemplates = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(assessmentTemplates);
	}
	$: searchAssessmentTemplate({ title, type });

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleAssessmentTemplateDelete = async (e, id) => {
		const assessmentTemplateId = id;
		await Delete({
			sessionId: data.sessionId,
			assessmentTemplateId: assessmentTemplateId
		});
		window.location.href = assessmentRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/assessment-templates`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by title" bind:value={title} class="input w-auto grow" />
	<input type="text" placeholder="Search by type" bind:value={type} class="input w-auto grow" />
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="my-2 table-container !border !border-secondary-100">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="Title">Title</th>
				<th data-sort="Type">Type</th>
				<th>Provider</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href={viewRoute(row.id)}>
							{Helper.truncateText(row.Title, 40)}
						</a>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">
						{Helper.truncateText(row.Type, 40)}
					</td>
					<td role="gridcell" aria-colindex={4} tabindex="0">
						{Helper.truncateText(row.Provider, 40)}
					</td>
					<td>
						<a href={editRoute(row.id)} class="btn btn-icon-sm -my-1 hover:variant-soft-primary">
							<Fa icon={faPencil} style="color-text-primary" size="md" />
						</a>
					</td>
					<td>
						<Confirm
							confirmTitle="Delete"
							cancelTitle="Cancel"
							let:confirm={confirmThis}
							on:delete={(e) => handleAssessmentTemplateDelete(e, row.id)}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleAssessmentTemplateDelete, row.id)}
								class="btn btn-icon-sm -my-1 hover:variant-soft-error"
							>
								<Fa icon={faTrash} />
							</button>
							<span slot="title">Delete</span>
							<span slot="description">
								Are you sure you want to delete a assessment template?
							</span>
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
