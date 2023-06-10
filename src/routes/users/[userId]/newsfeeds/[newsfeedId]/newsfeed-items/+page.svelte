<script lang="ts">
	import Fa from 'svelte-fa';
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { faPencil, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let newsfeedItems = data.newsfeedItems;

	const userId = $page.params.userId;
	const newsfeedItemsRoute = `/users/${userId}/newsfeeds/newsfeed-items`;
	const createRoute = `/users/${userId}/newsfeeds/newsfeed-items/create`;

	const breadCrumbs = [
		{
			name: 'Newsfeed-Items',
			path: newsfeedItemsRoute
		}
	];

	// const dataTableStore = createDataTableStore(
	// 	// Pass your source data here:
	// 	newsfeedItems,
	// 	{
	// 		// The current search term.
	// 		search: '',
	// 		// The current sort key.
	// 		sort: '',
	// 		// Paginator component settings.
	// 		// pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	// 	}
	// );
	// // This automatically handles search, sort, etc when the model updates.
	// dataTableStore.subscribe((model) => dataTableHandler(model));

	// dataTableStore.updateSource(newsfeedItems);

	const handleNewsfeedItemDelete = async (e, id) => {
		const newsfeedItemId = id;
		await Delete({
			sessionId: data.sessionId,
			newsfeedItemId
		});
		window.location.href = newsfeedItemsRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/newsfeed-items`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by title" class="input w-auto grow" />
	<input type="text" placeholder="Search by description" class="input w-auto grow" />
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="flex justify-center flex-col mt-4 mx-10 overflow-y-auto ">
	<table class="table">
		<thead class="sticky top-0">
			<tr>
				<th>Id</th>
				<th>Title</th>
				<th>Description</th>
				<th>Link</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<!-- {#each $dataTableStore.filtered as row, rowIndex}
					<tr>
						<td >{rowIndex + 1}</td>
						<td >{row.Title}</td>
						<td ">{row.Description}</td>
						<td ">{row.Link}</td>
						<td>
							<a href="/users/${userId}/newsfeeds/newsfeed-items/{row.id}/edit"
								>
								<Fa icon={faPencil} style="color-text-primary" size="md" />
								</a
							>
						</td>
						<td>
							<button on:click|preventDefault={(e) => handleNewsfeedItemDelete(e, row.id)}>
								<Fa icon={faTrash} style="color-text-primary" size="md" />
							</button>
						</td>
					</tr>
				{/each} -->
		</tbody>
	</table>
</div>
<!-- <div class=" w-full bg-secondary-500 h-36 lg:h-16 md:h-16 sm:h-36 mb-10 pt-1 rounded-b-lg ">
		{#if $dataTableStore.pagination}<Paginator
				class="mt-2 mr-3 ml-3 "
				buttonClasses="btn-icon bg-surface-500 w-5 h-8"
				text="text-white"
				bind:settings={$dataTableStore.pagination}
			/>{/if}
	</div> -->
<!-- </div> -->
