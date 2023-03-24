<script lang="ts">
	import Fa from 'svelte-fa';
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import date from 'date-and-time';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { faSearch, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let learningPaths = data.learningPaths;
	learningPaths = learningPaths.map((item, index) => ({ ...item, index: index + 1 }));
	console.log('course', learningPaths);
	const userId = $page.params.userId;
	const learningJourneyRoute = `/users/${userId}/learning-journeys`;
	const editRoute = (id) => `/users/${userId}/learning-journeys/${id}/edit`;
	const createRoute = `/users/${userId}/learning-journeys/create`;

	const breadCrumbs = [
		{
			name: 'Learning-Journey',
			path: learningJourneyRoute
		}
	];

	let name = undefined;
	let preferenceWeight = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const dataTableStore = createDataTableStore(
		// Pass your source data here:
		learningPaths,
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

	const searchParams = async (name: string, preferenceWeight: string) => {
		await searchLearningJourney({
			name: name,
			preferenceWeight: preferenceWeight
		});
	};

	async function searchLearningJourney(model) {
		let url = `/api/server/learning-journeys/search?`;
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
		if (name) {
			url += `&name=${name}`;
		}
		if (preferenceWeight) {
			url += `&preferenceWeight=${preferenceWeight}`;
		}

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const response = await res.json();
		learningPaths = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(learningPaths);
	}

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleLearningJourneyDelete = async (e, id) => {
		const symptomId = id;
		await Delete({
			sessionId: data.sessionId,
			symptomId
		});
		window.location.href = learningJourneyRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/learning-journeys`, {
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
			<a href={createRoute} class="absolute right-4 lg:mr-[-18px] ">
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
	class="flex flex-row mx-14 lg:mt-10 md:mt-10 sm:mt-4 mt-4 lg:gap-7 md:gap-8 sm:gap-4 gap-4 lg:flex-row md:flex-row sm:flex-col min-[280px]:flex-col"
>
	<div class="basis-1/2 justify-center items-center ">
		<div class="relative flex items-center">
			<input
				type="text"
				bind:value={name}
				placeholder="Search by name"
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center  ">
			<input
				type="text"
				bind:value={preferenceWeight}
				placeholder="Search by preference weight"
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="sm:flex flex">
		<button
			on:click={() => searchParams(name, preferenceWeight)}
			class="btn variant-filled-primary lg:w-20 md:w-20 sm:w-20 w-20 rounded-lg bg-primary hover:bg-primary  "
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
<div class="flex justify-center flex-col mt-4 mx-10 overflow-y-auto ">
	<table class="table rounded-b-none">
		<thead class="sticky top-0">
			<tr>
				<th style="width: 5%;">Id</th>
				<th style="width: 18%;">Name</th>
				<th style="width: 34%;">Description</th>
				<th style="width: 18%;">Preference Weight</th>
				<th style="width: 35%;">Created Date</th>
			</tr>
		</thead>
	</table>
	<div class=" overflow-y-auto h-[600px] bg-tertiary-500">
		<table class="table w-full">
			<tbody class="">
				{#each $dataTableStore.filtered as row, rowIndex}
					<tr>
						<td style="width: 5%;">{row.index}</td>
						<td style="width: 20%;">{row.Name}</td>
						<td style="width: 35%;"
							>{row.Description.length > 10
								? row.Description.substring(0, 55) + '...'
								: row.Description}</td
						>
						<td style="width: 20%;">{row.PreferenceWeight}</td>
						<td style="width: 20%;">{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td>
						<td style="">
							<a href={editRoute(row.id)}
								><Fa icon={faPencil} style="color-text-primary" size="md" /></a
							>
						</td>
						<td>
							<Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
								on:delete={(e) => {
									handleLearningJourneyDelete(e, row.id);
								}}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleLearningJourneyDelete, row.id)}
									class=""><Fa icon={faTrash} /></button
								>
								<span slot="title"> Delete </span>
								<span slot="description">
									Are you sure you want to delete a learning journey?
								</span>
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
