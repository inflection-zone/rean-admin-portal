<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import { Paginator, type PaginationSettings, ProgressBar } from '@skeletonlabs/skeleton';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	// let tenants = data.tenants.Items;

	const userId = $page.params.userId;
	const tenantRoute = `/users/${userId}/tenants`;
	const editRoute = (id) => `/users/${userId}/tenants/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/tenants/${id}/view`;
	const createRoute = `/users/${userId}/tenants/create`;

	const breadCrumbs = [{ name: 'Prompt Groups', path: tenantRoute }];

	// let name = undefined;
	// let code = undefined;
	// let email = undefined;
	// let phone = undefined;
	// let sortBy = 'Name';
	// let sortOrder = 'ascending';
	// let itemsPerPage = 10;
	// let offset = 0;
	// let totalTenantsCount = data.tenants.TotalCount;
	// let isSortingName = false;
	// let isSortingCode = false;
	// let isSortingEmail = false;
	// let isSortingPhone = false;
	// let items = 10;

	// let paginationSettings = {
	// 	page: 0,
	// 	limit: 10,
	// 	size: totalTenantsCount,
	// 	amounts: [10, 20, 30, 50]
	// } satisfies PaginationSettings;

	// async function searchTenant(model) {
	// 	let url = `/api/server/tenants/search?`;
	// 	if (sortOrder) url += `sortOrder=${sortOrder}`;
	// 	else url += `sortOrder=ascending`;
	// 	if (sortBy) url += `&sortBy=${sortBy}`;
	// 	if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
	// 	if (offset) url += `&pageIndex=${offset}`;
	// 	if (name) url += `&name=${name}`;
	// 	if (code) url += `&code=${code}`;
	// 	if (email) url += `&email=${email}`;
	// 	if (phone) url += `&phone=${phone}`;

	// 	const res = await fetch(url, {
	// 		method: 'GET',
	// 		headers: { 'content-type': 'application/json' }
	// 	});
	// 	const response = await res.json();
	// 	tenants = response.map((item, index) => ({ ...item, index: index + 1 }));
	// }

	// $: retrivedTenants = tenants.slice(
	// 	paginationSettings.page * paginationSettings.limit,
	// 	paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	// );

	// $: if (browser)
	// 	searchTenant({
	// 		name: name,
	// 		code: code,
	// 		email: email,
	// 		phone: phone,
	// 		itemsPerPage: itemsPerPage,
	// 		pageIndex: offset,
	// 		sortOrder: sortOrder,
	// 		sortBy: sortBy
	// 	});

	// function onPageChange(e: CustomEvent): void {
	// 	let pageIndex = e.detail;
	// 	itemsPerPage = items * (pageIndex + 1);
	// }

	// function onAmountChange(e: CustomEvent): void {
	// 	itemsPerPage = e.detail;
	// 	items = itemsPerPage;
	// }

	// function sortTable(columnName) {
	// 	isSortingName = false;
	// 	isSortingCode = false;
	// 	isSortingEmail = false;
	// 	isSortingPhone = false;
	// 	sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
	// 	if (columnName === 'Name') {
	// 		isSortingName = true;
	// 	} else if (columnName === 'Code') {
	// 		isSortingCode = true;
	// 	} else if (columnName === 'Email') {
	// 		isSortingEmail = true;
	// 	} else if (columnName === 'Phone') {
	// 		isSortingPhone = true;
	// 	}

	// 	sortBy = columnName;
	// }

	// const handleTenantDelete = async (id) => {
	// 	const tenantId = id;
	// 	await Delete({
	// 		sessionId: data.sessionId,
	// 		tenantId
	// 	});
	// 	window.location.href = tenantRoute;
	// };

	// async function Delete(model) {
	// 	const response = await fetch(`/api/server/tenants`, {
	// 		method: 'DELETE',
	// 		body: JSON.stringify(model),
	// 		headers: { 'content-type': 'application/json' }
	// 	});
	// }

  let serialNumbers = Array.from({ length: 6 }, (_, i) => i + 1);
  let group = ['Chat Default', 'Content Generation', 'Generic', 'Miscellaneous', 'Evaluation and Quality', 'Chat Custom'];
  let displayId = ['432425', '421115', '478445', '465224', '425861', '423532'];
  let lastUpdated = [
      Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
      Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
      Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
      Date.now() - 20 * 24 * 60 * 60 * 1000, // 20 days ago
      Date.now() - 25 * 24 * 60 * 60 * 1000 // 25 days ago
  ];
  // Function to format milliseconds into a human-readable format
  function formatLastUpdated(timestamp) {
      const difference = Date.now() - timestamp;
      const days = Math.floor(difference / (24 * 60 * 60 * 1000));
      return `${days} days ago`;
  }
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap justify-between my-2 items-center">
  <h2 class="">Prompt Groups</h2>
  <a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="flex flex-wrap w-2/5 gap-2 my-2 items-center">
	<input
		type="text"
		name="name"
		placeholder="Search by name"
		class="input w-auto grow"
	/>
 
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table " role="grid">
    <thead class="!variant-soft-secondary  ">
        <!-- Table header -->
        <tr>
            <th>Id</th>
            <th>Group</th>
            <th>Display Id</th>
            <th>Last Updated</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody class=" !bg-white dark:!bg-inherit ">
        <!-- Table body -->
        {#each serialNumbers as serialNumber (serialNumber)}
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 ">
                <td>{serialNumber}</td>
                <!-- Data cells for each document -->
                <td>{group[serialNumber - 1]}</td>
                <td>{displayId[serialNumber - 1]}</td>
                <td>{formatLastUpdated(lastUpdated[serialNumber - 1])}</td>
                <td><button><Icon icon="mdi-light:eye" class="text-lg"/></button></td>
                <td><button><Icon icon="material-symbols:edit-outline" class="text-lg"/></button></td>
                <td><button><Icon icon="material-symbols:delete-outline-rounded" class="text-lg"/></button></td>
            </tr>
        {/each}
    </tbody>
</table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	<Paginator
	
		buttonClasses=" text-primary-500"
		regionControl = 'bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200'
		controlVariant = 'rounded-full text-primary-500 '
		controlSeparator = 'fill-primary-400'
		/>
</div>
