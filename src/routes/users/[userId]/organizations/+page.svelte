<script lang="ts">
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	const userId = $page.params.userId;
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { faPencil, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let organizations = data.organization;
	let index = Number;
	organizations = organizations.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(organizations, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	const organizationRoute = `/users/${userId}/organizations`;
	const createRoute = `/users/${userId}/organizations/create`;
	const editRoute = (id) => `/users/${userId}/organizations/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/organizations/${id}/view`;
	const breadCrumbs = [
		{
			name: 'Organizations',
			path: organizationRoute
		}
	];

	let type = undefined;
	let name = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const searchParams = async (type: string, name: string) => {
		await searchOrganization({
			type: type,
			name: name
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
		if (name) {
			url += `&name=${name}`;
		}

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const response = await res.json();
		organizations = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(organizations);
	}
	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleOrganizationsDelete = async (e, id) => {
		const organizationId = id;
		console.log('organizationId', organizationId);

		await Delete({
			sessionId: data.sessionId,
			organizationId: organizationId
		});

		window.location.href = organizationRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/organizations/delete`, {
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
			<a href={createRoute} class="absolute right-1 lg:mr-[-20px] ">
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
				placeholder="Search by name"
				bind:value={name}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="sm:flex flex">
		<button
			class="btn variant-filled-primary lg:w-20 md:w-20 sm:w-20 w-20 rounded-lg bg-primary hover:bg-primary  "
			on:click={() => searchParams(type, name)}
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

<div class="flex justify-center flex-col mx-10 mt-4 mb-10 overflow-y-auto ">
	<table class="table rounded-b-none">
		<thead class="sticky top-0">
			<tr>
				<th style="width: 5%;">Id</th>
				<th style="width: 20%;">Type</th>
				<th style="width: 20%;">Name</th>
				<th style="width: 20%;">Phone</th>
				<th style="width: 20%">Email</th>
				<th style="width: 8%;" />
				<th style="width: 8%;" />
			</tr>
		</thead>
	</table>
	<div class=" overflow-y-auto h-[600px] bg-tertiary-500">
		<table class="table w-full">
			<tbody class="">
				{#each $dataTableStore.filtered as row, rowIndex}
					<tr>
						<td style="width: 5%;">{row.index}</td>
						<td style="width: 20%;"><a href={viewRoute(row.id)}>{row.Type}</a></td>
						<td style="width: 20%;">{row.Name}</td>
						<td style="width: 20%;">{row.ContactPhone}</td>
						<td style="width: 20%;">{row.ContactEmail}</td>
						<td style="width: 8%;">
							<a class="text-primary" href={editRoute(row.id)}><Fa icon={faPencil} /></a></td
						>
						<td style="width: 8%;"
							><Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
								on:delete={(e) => {
									handleOrganizationsDelete(e, row.id);
								}}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleOrganizationsDelete, row.id)}
									class=""><Fa icon={faTrash} /></button
								>

								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a organization? </span>
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
