<script lang="ts">
	import date from 'date-and-time';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import {
		Paginator,
		createDataTableStore,
		dataTableHandler,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { browser } from '$app/environment';

	////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const userId = $page.params.userId;
	const enrollmentId = $page.params.enrollmentId;
	let enrollmentsTasks = data.enrollmentTask;
	let participantResponse = data.participantResponse;
	let id = enrollmentsTasks.id;
	let enrollmentDsipId = data.enrollment;
	let enrollmentCode = enrollmentDsipId.DisplayId;

	const enrollmentsRoute = `/users/${userId}/enrollments`;
	const enrollmentsTask = `/users/${userId}/enrollments/${enrollmentId}/tasks`;

	let assetType = undefined;
	let scheduledDate = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	let enrollmentsTasksResult = enrollmentsTasks.map((task) => {
		const newTask = task;
		participantResponse.forEach((item) => {
			if (task.id === item.EnrollmentTaskId) {
				newTask.ProgressStatus = item.ProgressStatus;
			}
		});
		return newTask;
	});

	const breadCrumbs = [
		{
			name: 'Enrollment',
			path: enrollmentsRoute
		},
		{
			name: 'Task',
			path: enrollmentsTask
		}
	];

	const dataTableStore = createDataTableStore(enrollmentsTasksResult, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));

	async function searchApiClient(model) {
		let url = `/api/server/enrollment-task/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (assetType) url += `&assetType=${assetType}`;
		if (scheduledDate) url += `&scheduledDate=${scheduledDate}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		enrollmentsTasksResult = response.map((item, index) => ({ ...item, index: index + 1 }));
		dataTableStore.updateSource(enrollmentsTasksResult);
	}
	$: if (browser) searchApiClient({ assetType: assetType, scheduledDate: scheduledDate });
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-8">
	<div class="lg:w-[11%] md:w-1/6 w-1/6 ">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="lable-text font-semibold">Enrollment Code</label>
	</div>
	<span class="lg:w-1/7 w-1/5">{enrollmentCode}</span>
</div>
<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by Type" bind:value={assetType} class="input" />
	<input type="date" placeholder="Start date" bind:value={scheduledDate} class="input" />
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>Name</th>
				<th>Type</th>
				<th>Created Date</th>
				<th>Completed</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">{row.Asset.Name}</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">{row.AssetType}</td>
					<td role="gridcell" aria-colindex={4} tabindex="0"
						>{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td
					>
					{#if item.ProgressStatus === 'Completed'}
						<Icon icon="material-symbols:right-outline" class="text-lg" />
					{:else}
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					{/if}
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
