<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import Icon from '@iconify/svelte';
	import { Paginator, createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const module = data.module;

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleRoute = `/users/${userId}/courses/${courseId}/modules`;
	const createRoute = `/users/${userId}/courses/${courseId}/modules/create`;

	const breadCrumbs = [{ name: 'Modules', path: moduleRoute }];

	const dataTableStore = createDataTableStore(
		// Pass your source data here:
		module,
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
	dataTableStore.subscribe((model) => dataTableHandler(model));

	dataTableStore.updateSource(module);

	const handleModuleDelete = async (e, id) => {
		const moduleId = id;
		await Delete({
			sessionId: data.sessionId,
			moduleId
		});
		window.location.href = moduleRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/modules`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by name" class="input w-auto grow" />
	<input type="text" placeholder="Search by duration" class="input w-auto grow" />
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="my-2 table-container !border !border-secondary-100">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Id</th>
				<th>Name</th>
				<th>Description</th>
				<th>Duration</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white">
			{#each $dataTableStore.filtered as row, rowIndex}
				<tr class="!border-b !border-b-secondary-100">
					<td>{rowIndex + 1}</td>
					<td>{row.Name}</td>
					<td>{row.Description}</td>
					<td>{row.DurationInMins}</td>
					<td>
						<a
							href="/users/${userId}/courses/${courseId}/modules/{row.id}/edit"
							class="btn p-2 -my-1 hover:variant-soft-primary"
						>
							<Icon icon="material-symbols:edit-outline" class="text-lg" />
						</a>
					</td>
					<td>
						<Confirm
							confirmTitle="Delete"
							cancelTitle="Cancel"
							let:confirm={confirmThis}
							on:delete={(e) => handleModuleDelete(e, row.id)}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleModuleDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>

							<span slot="title">Delete</span>
							<span slot="description">Are you sure you want to delete a module?</span>
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
