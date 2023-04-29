<script lang="ts">
	import {
		createDataTableStore,
		dataTableHandler,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faPencil, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import { Helper } from '$lib/utils/helper';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let labRecordTypes = data.labRecordTypes;
	let index = Number;
	labRecordTypes = labRecordTypes.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(labRecordTypes, {
		search: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/lab-record-types/create`;
	const editRoute = (id) => `/users/${userId}/lab-record-types/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/lab-record-types/${id}/view`;
	const labRecordTypesRoute = `/users/${userId}/lab-record-types`;

	const breadCrumbs = [
		{
			name: 'Lab-Record-Types',
			path: labRecordTypesRoute
		}
	];

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleLabRecordTypeDelete = async (e, id) => {
		const labRecordTypeId = id;
		console.log('labRecordTypeId', labRecordTypeId);
		await Delete({
			sessionId: data.sessionId,
			labRecordTypeId: labRecordTypeId
		});
		window.location.href = labRecordTypesRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/lab-record-types`, {
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
			<a href={createRoute} class="absolute right-4 lg:mr-[-32px] ">
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
<div class="flex justify-center flex-col mt-4 mx-10 mb-10 overflow-y-auto ">
	<table class="table rounded-b-none" role="grid" use:tableInteraction use:tableA11y>
		<thead
			on:click={(e) => {
				dataTableStore.sort(e);
			}}
			on:keypress
			class="sticky top-0"
		>
			<tr>
				<th data-sort="index" style="width: 4%;">Id</th>
				<th data-sort="TypeName" style="width: 15%;">Type Name</th>
				<th data-sort="DisplayName" style="width: 15%;">Display Name</th>
				<th style="width: 12%;">Minimum</th>
				<th style="width: 12%;">Maximum</th>
				<th style="width: 8%;">Unit</th>
				<th style="width: 8%;" />
				<th style="width: 8%;" />
			</tr>
		</thead>
	</table>
	<div class=" overflow-y-auto h-[600px] bg-tertiary-500">
		<table class="table w-full">
			<tbody class="">
				{#each $dataTableStore.filtered as row}
					<tr>
						<td role="gridcell" aria-colindex={1} tabindex="0" style="width: 5%;">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0" style="width: 18%;"
							><a href={viewRoute(row.id)}>{Helper.truncateText(row.TypeName, 20)} </a></td
						>
						<td role="gridcell" aria-colindex={3} tabindex="0" style="width: 14;"
							>{Helper.truncateText(row.DisplayName, 20)}
						</td>
						<td role="gridcell" aria-colindex={4} tabindex="0" style="width: 14%;"
							>{row.NormalRangeMin}</td
						>
						<td role="gridcell" aria-colindex={5} tabindex="0" style="width: 15%;"
							>{row.NormalRangeMax}</td
						>
						<td role="gridcell" aria-colindex={6} tabindex="0" style="width: 13%;">{row.Unit}</td>
						<td style="width: 8%;">
							<a href={editRoute(row.id)}
								><Fa icon={faPencil} style="color-text-primary" size="md" /></a
							>
						</td>
						<td style="width: 8%;">
							<Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
								on:delete={(e) => {
									handleLabRecordTypeDelete(e, row.id);
								}}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleLabRecordTypeDelete, row.id)}
									class=""><Fa icon={faTrash} /></button
								>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a lab record type? </span>
							</Confirm>
						</td>
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
