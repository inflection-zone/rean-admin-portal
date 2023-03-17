<script lang="ts">
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faPencil, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let apiClient = data.apiClients;
	let index=Number;
	apiClient = apiClient.map((item,index) => ({ ...item,index: index + 1  }));

	const dataTableStore = createDataTableStore(apiClient, {
		search: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/api-clients/create`;
	const editRoute = (id) => `/users/${userId}/api-clients/${id}/edit`;
	const apiClientRoute = `/users/${userId}/api-clients`;

	const breadCrumbs = [
		{
			name: 'Api-client',
			path: apiClientRoute
		}
	];

	let clientName = undefined;
	let contactEmail = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const searchParams = async (clientName: string, contactEmail: string) => {
		await searchApiClient({
			clientName: clientName,
			contactEmail: contactEmail
		});
	};

	async function searchApiClient(model) {
		let url = `/api/server/api-client/search?`;
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
		if (clientName) {
			url += `&clientName=${clientName}`;
		}
		if (contactEmail) {
			url += `&clientEmail=${contactEmail}`;
		}

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const response = await res.json();
		apiClient = response.map((item, index) => ({ ...item, index: index + 1  }));
		dataTableStore.updateSource(apiClient);
	}
	dataTableStore.subscribe((model) => dataTableHandler(model));
	
	const handleApiClientDelete = async (e, id) => {
    	const clientId = id;
    
    	await Delete({
      		sessionId: data.sessionId,
      		apiClientId:clientId
    	});
		window.location.href = apiClientRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/api-client`, {
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
				placeholder="Search by name"
				bind:value={clientName}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center  ">
			<input
				type="text"
				placeholder="Search by email"
				bind:value={contactEmail}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="sm:flex flex">
		<button
			class="btn variant-filled-primary lg:w-20 md:w-20 sm:w-20 w-20 rounded-lg bg-primary hover:bg-primary  "
			on:click={() => searchParams(clientName, contactEmail)}
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

<div class="flex justify-center flex-col mt-4 mx-10 mb-10 overflow-y-auto ">
	<table class="table rounded-b-none">
		<thead class="sticky top-0">
			<tr>
				<th style="width: 5%;">Id</th>
				<th style="width: 20%;">Topic Name</th>
				<th style="width: 30%;">Information</th>
				<th style="width: 24%;"> Detailed Information</th>
				<th style="width: 8%;">Edit</th>
				<th style="width: 8%;">Delete</th>
			</tr>
		</thead>
	</table>
	<div class=" overflow-y-auto h-[600px] bg-tertiary-500">
		<table class="table w-full">
			<tbody class="">
				{#each $dataTableStore.filtered as row, rowIndex}
					<tr>
						<td style="width: 5%;">{row.index}</td>
						<td style="width: 20%;">{row.ClientName}</td>
						<td style="width: 30%;">{row.Email}</td>
						<td style="width: 24%;">{row.Phone}</td>
						<td style="width: 8%;">
							<a class="text-primary" href={editRoute(row.id)}><Fa icon={faPencil} /></a></td
						>
						<td style="width: 8%;"
							><Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
								on:delete={(e) => {
									handleApiClientDelete(e, row.id);
								}}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleApiClientDelete, row.id)}
									class=""><Fa icon={faTrash} /></button
								>

								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a client? </span>
							</Confirm></td
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
