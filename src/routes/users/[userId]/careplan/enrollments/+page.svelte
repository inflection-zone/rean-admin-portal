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
	import { browser } from '$app/environment';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
	const enrollmentsRoute = () => `/users/${userId}/enrollments`;

	export let data: PageServerData;
	let enrollment = data.enrollments;
	let carePlan = undefined;
	let displayId = undefined;
	let startDate = undefined;
	let endDate = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const breadCrumbs = [
		{
			name: 'Enrollments',
			path: enrollmentsRoute()
		}
	];

	enrollment = enrollment.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(enrollment, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	async function searchEnrollments(model) {
		let url = `/api/server/enrollments/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (carePlan) {
			const careplanId = enrollment.map((item) => {
				if (item.Careplan.Name == carePlan) {
					return item.Careplan.id;
				}
			});
			url += `&carePlan=${careplanId}`;
		}
		if (displayId) {
			url += `&displayId=${displayId}`;
		}
		if (startDate) {
			url += `&startDate=${startDate}`;
		}
		if (endDate) {
			url += `&endDate=${endDate}`;
		}

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		enrollment = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(enrollment);
	}
	$: if (browser)
		searchEnrollments({
			carePlan: carePlan,
			displayId: displayId,
			startDate: startDate,
			endDate: endDate
		});

	dataTableStore.subscribe((model) => dataTableHandler(model));

</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input bind:value={carePlan} type="text" placeholder="Search by care plan" class="input w-auto grow" />
	<input
		bind:value={displayId}
		type="text"
		placeholder="Search by Enrollment code"
		class="input w-auto grow"
	/>
	<input
		bind:value={startDate}
		type="date"
		placeholder="Start date"
		class="input w-auto grow uppercase"
	/>
	<input
		bind:value={endDate}
		type="date"
		placeholder="End date"
		class="input w-auto grow uppercase "
	/>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>Participant</th>
				<th>Enrollment Code</th>
				<th>Careplan</th>
				<th>Start Date</th>
				<th>End Date</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href="/users/${userId}/enrollments/{row.id}/view"
							>Participant - {row.Participant.DisplayId}</a
						>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">{row.DisplayId}</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">{row.Careplan.Name}</td>
					<td role="gridcell" aria-colindex={4} tabindex="0"
						>{date.format(new Date(row.StartDate), 'DD-MMM-YYYY')}</td
					>
					<td role="gridcell" aria-colindex={5} tabindex="0"
						>{date.format(new Date(row.EndDate), 'DD-MMM-YYYY')}</td
					>
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
