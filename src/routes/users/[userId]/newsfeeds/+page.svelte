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
	let newsfeeds = data.newsfeeds;
	newsfeeds = newsfeeds.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(newsfeeds, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});
	const userId = $page.params.userId;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;
	const editRoute = (id) => `/users/${userId}/newsfeeds/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/newsfeeds/${id}/view`;
	const viewItemRoute = (id) => `/users/${userId}/newsfeeds/${id}/newsfeed-items/${id}/view`;
	const createRoute = `/users/${userId}/newsfeeds/create`;

	const breadCrumbs = [{ name: 'Newsfeeds', path: newsfeedRoute }];

	let title = undefined;
	let category = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	async function searchNewsfeed(model) {
		let url = `/api/server/newsfeeds/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (title) url += `&title=${title}`;
		if (category) url += `&category=${category}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});

		const response = await res.json();
		newsfeeds = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(newsfeeds);
	}
	$: if (browser) searchNewsfeed({ title: title, category: category });

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleNewsfeedDelete = async (e, id) => {
		const newsfeedId = id;
		await Delete({
			sessionId: data.sessionId,
			newsfeedId
		});
		window.location.href = newsfeedRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/newsfeeds`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by title" bind:value={title} class="input w-auto grow" />
	<input
		type="text"
		placeholder="Search by category"
		bind:value={category}
		class="input w-auto grow"
	/>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="Title">Title</th>
				<th>Link</th>
				<th data-sort="Category">Category</th>
				<th>Newsfeed Items</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href={viewRoute(row.id)}>{Helper.truncateText(row.Title, 20)}</a>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">{Helper.truncateText(row.Link, 30)}</td
					>
					<td role="gridcell" aria-colindex={4} tabindex="0">{row.Category}</td>
					<td role="gridcell" aria-colindex={5} tabindex="0"
						>{#if newsfeeds.length <= 0}
							<span>null</span>
						{:else}
							{#each row.FeedItems as items, i}
								<a href={viewItemRoute(items.id)}>
									{i + 1}.{Helper.truncateText(items.Title, 20)}</a
								>
								<br />
							{/each}
						{/if}
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
							on:delete={(e) => {
								handleNewsfeedDelete(e, row.id);
							}}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleNewsfeedDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>
							<span slot="title"> Delete </span>
							<span slot="description"> Are you sure you want to delete a newsfeed? </span>
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
