<script lang="ts">
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const notification = data.notification;
	console.log('notification', notification);
	let columns = ['ID', 'Title', 'Body', 'Type'];
	const dataTableStore = createDataTableStore(
		// Pass your source data here:
		notification,
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

	dataTableStore.updateSource(notification);
</script>

<div class="mx-10 mb-16">
	<input
		class="input my-3"
		bind:value={$dataTableStore.search}
		type="search"
		placeholder="Search..."
	/>
	<div class="flex justify-center flex-col mt-4 overflow-y-auto ">
		<table class="table rounded-b-none">
			<thead class="sticky top-0">
				<tr>
					<th style="width: 7%;">Id</th>
					<th style="width: 22%;">Title</th>
					<th style="width: 38%;">Body</th>
					<th style="width: 33%;">Type</th>
				</tr>
			</thead>
		</table>
		<div class=" overflow-y-auto h-[600px] bg-tertiary-500">
			<table class="table w-full">
				<tbody class="">
					{#each $dataTableStore.filtered as row, rowIndex}
						<tr>
							<td style="width: 7%;">{rowIndex + 1}</td>
							<td style="width: 22%;">{row.Title}</td>
							<td style="width: 38%;"
								>{row.Body.length > 30
									? row.Body.substring(0, 30) + '...'
									: row.Body}</td
							>
							<td style="width: 33%;"
								>{row.Type.length > 20
									? row.Type.substring(0, 20) + '...'
									: row.Type}</td
							>
						</tr>
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
</div>
