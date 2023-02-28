<script lang="ts">
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const knowledgeNuggets = data.knowledgeNuggets;
	console.log('knowledgeNuggets', knowledgeNuggets);

	const dataTableStore = createDataTableStore(
		// Pass your source data here:
		knowledgeNuggets,
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

	dataTableStore.updateSource(knowledgeNuggets);
</script>

<div class="mx-10 mb-16">
	<input
		class="input my-3"
		bind:value={$dataTableStore.search}
		type="search"
		placeholder="Search..."
	/>

	<div class="h-full bg-tertiary-500 w-full">
		<div class="overflow-x-auto rounded-t-lg w-full h-full ">
			<table />
			<table class="table table-hover table-container overflow-x-auto  w-full table-fixed">
				<thead class="fixed">
					<tr class="sticky top-0">
						<th style="width: 10%;">Id</th>
						<th style="width: 20%;">Topic Name</th>
						<th style="width: 20%;">Information</th>
						<th style="width: 50%;"> Detailed Information</th>
					</tr>
				</thead>
				<tbody class=" w-full ">
					{#each $dataTableStore.filtered as row, rowIndex}
						<tr>
							<td>{rowIndex + 1}</td>
							<td>{row.TopicName}</td>
							<td
								>{row.BriefInformation.length > 30
									? row.BriefInformation.substring(0, 30) + '...'
									: row.BriefInformation}</td
							>
							<td
								>{row.DetailedInformation.length > 20
									? row.DetailedInformation.substring(0, 20) + '...'
									: row.DetailedInformation}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class=" w-full bg-secondary-500 h-16 mb-10 pt-1 rounded-b-lg ">
			{#if $dataTableStore.pagination}<Paginator
					class="mt-2 mr-3"
					buttonClasses="btn-icon bg-surface-500"
					text="text-white"
					justify="lg:justify-end md:justify-center sm:justify-start justify-start"
					select="text-primary-500 rounded-lg"
					bind:settings={$dataTableStore.pagination}
				/>{/if}
		</div>
	</div>
</div>
