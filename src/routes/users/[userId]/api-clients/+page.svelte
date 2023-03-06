<script lang="ts">
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const apiClient = data.apiClients;
	
	const dataTableStore = createDataTableStore(
		// Pass your source data here:
		apiClient,
		{
			// The current search term.
			search: '',
			// The current sort key.
			sort: '',
			// Paginator component settings.
			pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
		}
	);
	dataTableStore.subscribe((model) => dataTableHandler(model));
	dataTableStore.updateSource(apiClient);

	
</script>

<div class="mx-10 mb-16">
	<div class="flex flex-row">
		<input
			class="input my-3 mr-3"
			bind:value={$dataTableStore.search}
			type="search"
			placeholder="Search..."
		/>

		<input
			class="input my-3 ml-3"
			bind:value={$dataTableStore.search}
			type="search"
			placeholder="Search..."
		/>
	</div>
	<div class="flex justify-center flex-col mt-4 overflow-y-auto ">
		<table class="table rounded-b-none">
			<thead class="sticky top-0">
				<tr>
					<th style="width: 7%;">Id</th>
					<th style="width: 22%;">Client Name</th>
					<th style="width: 38%;">Email</th>
					<th style="width: 33%;"> Phone</th>
				</tr>
			</thead>
		</table>
		<div class=" overflow-y-auto h-[600px] bg-tertiary-500">
			<table class="table w-full">
				<tbody class="">
					{#each $dataTableStore.filtered as row, rowIndex}
						<tr>
							<td style="width: 7%;">{rowIndex + 1}</td>
							<td style="width: 22%;">{row.ClientName}</td>
							<td style="width: 38%;">{row.Email}</td>
							<td style="width: 33%;">{row.Phone}</td>
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
