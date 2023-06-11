<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { Paginator, createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import type { PageServerData } from './$types';
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let assessmentNodes = data.assessmentNodes;
	assessmentNodes = assessmentNodes.map((item, index) => ({ ...item, index: index + 1 }));

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const assessmentRoute = `/users/${userId}/assessment-templates`;
	const assessmentNodeRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;
	const editRoute = (id) =>
		`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${id}/edit`;
	const viewRoute = (id) =>
		`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${id}/view`;
	const createRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/create`;

	const breadCrumbs = [
		{ name: 'Assessments', path: assessmentRoute },
		{ name: 'Assessment-Nodes', path: assessmentNodeRoute }
	];

	let title = undefined;
	let nodeType = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const dataTableStore = createDataTableStore(
		// Pass your source data here:
		assessmentNodes,
		{
			// The current search term.
			search: '',
			// The current sort key.
			sort: '',
			// Paginator component settings.
			pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
		}
	);
	// This automatically handles search, sort, etc when the model updates.

	async function searchNode(model) {
		templateId;
		let url = `/api/server/assessment-nodes/search?templateId=${templateId}&`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (title) url += `&title=${title}`;
		if (nodeType) url += `&nodeType=${nodeType}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		assessmentNodes = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(assessmentNodes);
	}
	$: if (browser) searchNode({ title: title, nodeType: nodeType });

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleAssessmentNodeDelete = async (e, id) => {
		const assessmentNodeId = id;
		console.log('assessmentNodeId', assessmentNodeId);
		await Delete({
			sessionId: data.sessionId,
			assessmentTemplateId: templateId,
			assessmentNodeId
		});
		window.location.href = assessmentNodeRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/assessment-nodes`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by title" bind:value={title} class="input w-auto grow" />
	<input type="text" placeholder="Search by type" bind:value={nodeType} class="input w-auto grow" />
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container !border !border-secondary-100 my-2">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Id</th>
				<th>Title</th>
				<th>Node Type</th>
				<th>Query Response Type</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white">
			{#each $dataTableStore.filtered as row, rowIndex}
				<tr class="!border-b !border-b-secondary-100">
					<td>{row.index}</td>
					<td>
						<a href={viewRoute(row.id)}> {row.Title}</a>
					</td>
					<td>{row.NodeType}</td>
					<td>{row.QueryResponseType}</td>
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
							on:delete={(e) => handleAssessmentNodeDelete(e, row.id)}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleAssessmentNodeDelete, row.id)}
								class="btn btn-icon-sm -my-1 hover:variant-soft-error"
							>
								<Fa icon={faTrash} />
							</button>
							<span slot="title"> Delete </span>
							<span slot="description"> Are you sure you want to delete a assessment node? </span>
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
