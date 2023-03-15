<script lang="ts">
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { faPencil, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let organizations = data.organization;
	organizations = organizations.map((item) => ({ ...item }));
	console.log('knowledgeNuggets', organizations);
	let columns = ['ID', 'TopicName', 'Information', 'BreifInformation'];
	const dataTableStore = createDataTableStore(
		// Pass your source data here:
		organizations,
		{
			// The current search term.
			search: '',
			// The current sort key.
			sort: '',
			// Paginator component settings.
			pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
		}
	);
	
	let type = undefined;
	let clientEmail = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const searchParams = async (type: string, clientEmail: string) => {
		await searchOrganization({
			type: type,
			clientEmail: clientEmail
		});
	};

	async function searchOrganization(model) {
		let url = `/api/server/organizations/search?`;
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
		if (type) {
			url += `&type=${type}`;
		}
		if (clientEmail) {
			url += `&clientEmail=${clientEmail}`;
		}

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const response = await res.json();
  organizations = response.map((item) => ({ ...item }));	
	}
	dataTableStore.subscribe((model) => dataTableHandler(model));

	dataTableStore.updateSource(organizations);
</script>

<div
	class=" mr-14 mt-14 lg:flex-row md:flex-row sm:flex-col flex-col lg:block md:block sm:hidden hidden"
>
	<div class="basis-1/2 justify-center items-center ">
		<div class="relative flex items-center  " />
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center">
			<a href="#" class="absolute right-1 lg:mr-[-20px] ">
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
				placeholder="Search by type"
				bind:value={type}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center  ">
			<input
				type="text"
				placeholder="Search by email"
				bind:value={clientEmail}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="sm:flex flex">
		<button
			class="btn variant-filled-primary lg:w-20 md:w-20 sm:w-20 w-20 rounded-lg bg-primary hover:bg-primary  "
			on:click={() => searchParams(type, clientEmail)}
		>
			<Fa icon={faSearch} class="text-neutral-content" size="lg" />
		</button>
		<a href="#" class=" right-14 ">
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
					<th style="width: 5%;">Id</th>
					<th style="width: 25%;">Type</th>
					<th style="width: 20%;">Name</th>
					<th style="width: 30%;">ContactPhone</th>
					<th style="width: 20%">Email</th>
				</tr>
			</thead>
		</table>
		<div class=" overflow-y-auto h-[600px] bg-tertiary-500">
			<table class="table w-full">
				<tbody class="">
					{#each $dataTableStore.filtered as row, rowIndex}
						<tr>
							<td style="width: 5%;">{rowIndex + 1}</td>
							<td style="width: 25%;">{row.Type}</td>
							<td style="width: 20%;">{row.Name}</td>
							<td style="width: 30%;">{row.ContactPhone}</td>
							<td style="width: 20%;">{row.ContactEmail}</td>
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

