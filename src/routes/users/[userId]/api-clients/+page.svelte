<script lang="ts">
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';

  import { faPencil, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let apiClient = data.apiClients;
	apiClient = apiClient.map((item) => ({ ...item}));
	const dataTableStore = createDataTableStore(
		apiClient,
		{
			pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
		}
	);

	let clientName = undefined;
	let clientEmail = undefined;
	let sortBy = 'CreatedAt';
  let sortOrder = 'ascending';
  let itemsPerPage = 10;
  let pageIndex = 0;


	const searchParams = async (clientName: string, clientEmail: string) => {
    await searchApiClient({
      clientName: clientName,
      clientEmail: clientEmail
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
      apiClient = response.map((item) => ({ ...item}));
		console.log("response=======++++++++",apiClient);
  }

	dataTableStore.subscribe((model) => dataTableHandler(model));
	dataTableStore.updateSource(apiClient);


</script>

<div class="mx-10 mb-16">
	<div class="flex flex-row">
		
		<input
			class="input my-3 mr-3"
			bind:value={clientName}
			type="search"
			name=""
			placeholder="Search..."
		/>

		<input
			class="input my-3 ml-3 mr-4"
			bind:value={clientEmail}
			type="search"
			placeholder="Search..."
		/>
	
		<div class="sm:flex flex ml-1">
			<button
				on:click={() => searchParams(clientName, clientEmail)}
				class="btn variant-filled-primary rounded-lg bg-primary h-10 mt-3.5 hover:bg-primary"
			>
				<Fa icon={faSearch} color="" class="button-text-color" size="lg" />
			</button>
		</div>
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
