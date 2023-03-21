<script lang="ts">
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { faPencil, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	export let data: PageServerData;
	let newsfeeds = data.newsfeeds;
	newsfeeds = newsfeeds.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(
		// Pass your source data here:
		newsfeeds,
		{
			// The current search term.
			search: '',
			// The current sort key.
			sort: '',
			// Paginator component settings.
			pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
		}
	);
	const userId = $page.params.userId;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;
	const editRoute = (id) => `/users/${userId}/newsfeeds/${id}/edit`;
	const createRoute = `/users/${userId}/newsfeeds/create`;

	const breadCrumbs = [
		{
			name: 'Newsfeeds',
			path: newsfeedRoute
		}
	];

	let title = undefined;
	let description = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const searchParams = async (title: string, description: string) => {
		await searchNewsfeed({
			title: title,
			description: description
		});
	};

	async function searchNewsfeed(model) {
		let url = `/api/server/newsfeeds/search?`;
		if (sortOrder) {
			url += `sortOrder=${sortOrder}`;
		} else {
			url += `sortOrder=ascending`;
		}
		if (sortBy) {
			url += `&sortBy=${sortBy}`;
		}
		if (itemsPerPage) {
			url += `&itemsPerPage=${itemsPerPage}`;
		}
		if (pageIndex) {
			url += `&pageIndex=${pageIndex}`;
		}
		if (title) {
			url += `&title=${title}`;
		}
		if (description) {
			url += `&description=${description}`;
		}

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const response = await res.json();
		newsfeeds = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(newsfeeds);
	}

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleNewsfeedDelete = async (e, id) => {
		const newsfeedId = id;
		console.log('organizationId', newsfeedId);
		await Delete({
			sessionId: data.sessionId,
			newsfeedId
		});
		window.location.href = newsfeedRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/newsfeeds/delete`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />
<div
	class=" mr-14 mt-8 lg:flex-row md:flex-row sm:flex-col flex-col lg:block md:block sm:hidden hidden"
>
	<div class="basis-1/2 justify-center items-center ">
		<div class="relative flex items-center  " />
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center">
			<a href={createRoute} class="absolute right-1 lg:mr-[-20px] ">
				<!-- <Fa icon={faCirclePlus} style="color: #5832A1" size="4x" /> -->
				<button
					class="btn variant-filled-primary w-28 rounded-lg hover:bg-primary bg-primary transition
          ease-in-out
          delay-150
          hover:scale-110
          duration-300 ... "
				>
					Add new
				</button>
			</a>
		</div>
	</div>
</div>
<div
	class="flex flex-row mx-10 lg:mt-10 md:mt-10 sm:mt-4 mt-4 lg:gap-7 md:gap-8 sm:gap-4 gap-4 lg:flex-row md:flex-row sm:flex-col min-[280px]:flex-col"
>
	<div class="basis-1/2 justify-center items-center ">
		<div class="relative flex items-center">
			<input
				type="text"
				placeholder="Search by title"
				bind:value={title}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center  ">
			<input
				type="text"
				placeholder="Search by description"
				bind:value={description}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="sm:flex flex">
		<button
			class="btn variant-filled-primary lg:w-20 md:w-20 sm:w-20 w-20 rounded-lg bg-primary hover:bg-primary  "
			on:click={() => searchParams(title, description)}
		>
			<Fa icon={faSearch} class="text-neutral-content" size="lg" />
		</button>
		<a href={createRoute} class=" right-14 ">
			<button
				class="btn variant-filled-primary hover:bg-primary lg:hidden md:hidden block sm:w-40 w-24 ml-4 rounded-lg bg-primary transition
          ease-in-out
          delay-150
          hover:scale-110
          duration-300 ...  "
			>
				ADD NEW
			</button>
		</a>
	</div>
</div>
<div class="flex justify-center flex-col mx-10 mt-4 overflow-y-auto ">
	<table class="table rounded-b-none">
		<thead class="sticky top-0">
			<tr>
				<th style="width: 7%;">Id</th>
				<th style="width: 23%;">Title</th>
				<th style="width: 30%;">Description</th>
				<th style="width: 50%;">Newsfeed Items</th>
			</tr>
		</thead>
	</table>
	<div class=" overflow-y-auto h-[600px] bg-tertiary-500">
		<table class="table w-full">
			<tbody class="">
				{#each $dataTableStore.filtered as row, rowIndex}
					<tr>
						<td style="width: 7%;">{row.index}</td>
						<td style="width: 23%;">{row.Title}</td>
						<td style="width: 30%;">{row.Description}</td>
						<td style="width: 30%;">{row.NewsfeedItemTitle}</td>
						<td style="">
							<a href={editRoute(row.id)}
								><Fa icon={faPencil} style="color-text-primary" size="md" /></a
							>
						</td>
						<td style="width: 8%;"
							><Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
								on:delete={(e) => {
									handleNewsfeedDelete(e, row.id);
								}}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleNewsfeedDelete, row.id)}
									class=""><Fa icon={faTrash} /></button
								>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a newsfeed? </span>
							</Confirm>
						</td></tr
					>
				{/each}
			</tbody>
		</table>
	</div>
	<div class=" w-full bg-secondary-500 h-36 lg:h-16 md:h-16 sm:h-36 mb-10 pt-1 rounded-b-lg ">
		{#if $dataTableStore.pagination}<Paginator
				class="mt-2 mr-3 ml-3 "
				buttonClasses="btn-icon bg-surface-500 w-5 h-8"
				text="text-white"
				bind:settings={$dataTableStore.pagination}
			/>{/if}
	</div>
</div>
