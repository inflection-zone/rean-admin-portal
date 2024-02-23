<script lang="ts">
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Confirm from '$lib/components/modal/confirmModal.svelte';
    import { Helper } from '$lib/utils/helper';
    import Icon from '@iconify/svelte';
    import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
    import date from 'date-and-time';
    import type { PageServerData } from './$types';

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // export let data: PageServerData;
    // let tenants = data.tenants.Items;

    const userId = $page.params.userId;
    const tenantRoute = `/users/${userId}/tenants`;
    const editRoute = (id) => `/users/${userId}/tenants/${id}/edit`;
    const viewRoute = (id) => `/users/${userId}/tenants/${id}/view`;
    const createRoute = `/users/${userId}/tenants/create`;

    const breadCrumbs = [{ name: 'Prompt Explorer', path: tenantRoute }];

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
    //     page: 0,
    //     limit: 10,
    //     size: totalTenantsCount,
    //     amounts: [10, 20, 30, 50]
    // } satisfies PaginationSettings;

    // async function searchTenant(model) {
    //     let url = `/api/server/tenants/search?`;
    //     if (sortOrder) url += `sortOrder=${sortOrder}`;
    //     else url += `sortOrder=ascending`;
    //     if (sortBy) url += `&sortBy=${sortBy}`;
    //     if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
    //     if (offset) url += `&pageIndex=${offset}`;
    //     if (name) url += `&name=${name}`;
    //     if (code) url += `&code=${code}`;
    //     if (email) url += `&email=${email}`;
    //     if (phone) url += `&phone=${phone}`;

    //     const res = await fetch(url, {
    //         method: 'GET',
    //         headers: { 'content-type': 'application/json' }
    //     });
    //     const response = await res.json();
    //     tenants = response.map((item, index) => ({ ...item, index: index + 1 }));
    // }

    // $: retrivedTenants = tenants.slice(
    //     paginationSettings.page * paginationSettings.limit,
    //     paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    // );

    // $: if (browser)
    //     searchTenant({
    //         name: name,
    //         code: code,
    //         email: email,
    //         phone: phone,
    //         itemsPerPage: itemsPerPage,
    //         pageIndex: offset,
    //         sortOrder: sortOrder,
    //         sortBy: sortBy
    //     });

    // function onPageChange(e: CustomEvent): void {
    //     let pageIndex = e.detail;
    //     itemsPerPage = items * (pageIndex + 1);
    // }

    // function onAmountChange(e: CustomEvent): void {
    //     itemsPerPage = e.detail;
    //     items = itemsPerPage;
    // }

    // function sortTable(columnName) {
    //     isSortingName = false;
    //     isSortingCode = false;
    //     isSortingEmail = false;
    //     isSortingPhone = false;
    //     sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
    //     if (columnName === 'Name') {
    //         isSortingName = true;
    //     } else if (columnName === 'Code') {
    //         isSortingCode = true;
    //     } else if (columnName === 'Email') {
    //         isSortingEmail = true;
    //     } else if (columnName === 'Phone') {
    //         isSortingPhone = true;
    //     }

    //     sortBy = columnName;
    // }

    // const handleTenantDelete = async (id) => {
    //     const tenantId = id;
    //     await Delete({
    //         sessionId: data.sessionId,
    //         tenantId
    //     });
    //     window.location.href = tenantRoute;
    // };

    // async function Delete(model) {
    //     const response = await fetch(`/api/server/tenants`, {
    //         method: 'DELETE',
    //         body: JSON.stringify(model),
    //         headers: { 'content-type': 'application/json' }
    //     });
    // }

    let serialNumbers = Array.from({ length: 6 }, (_, i) => i + 1);
    let prompt = [
        'QuestionAnswer_Master',
        'Personalization Summary',
        'Summarize Paragraph',
        'Identify JSON_Medication Params_Img',
        'Identify JSON_Medication Params_Chat',
        'Identify JSON_Reminders'
    ];
    let version = ['v3', 'v1', 'v3', 'v1', 'v3', 'v1'];
    let displayId = ['432425', '421115', '478445', '465224', '425861', '423532'];
    let model = ['OpenAi GPT 3.5 Turbo', 'Claude', 'Open GPT 4.0', 'Llama 2 13B', 'Google Palm', 'Falcon 40B'];
    let group = ['Chat Default', 'Chat Default', 'Generic', 'Miscellaneous', 'Chat Default', 'Chat Default'];
    let parentDocumentLink = 'https://example.com/shared-link';
    let activeStatus = [true, false, true, false, true, true];
    let lastUpdated = [
        Date.now() - 2 * 24 * 60 * 60 * 1000,
        Date.now() - 5 * 24 * 60 * 60 * 1000,
        Date.now() - 10 * 24 * 60 * 60 * 1000,
        Date.now() - 15 * 24 * 60 * 60 * 1000,
        Date.now() - 20 * 24 * 60 * 60 * 1000,
        Date.now() - 25 * 24 * 60 * 60 * 1000
    ];
    function formatLastUpdated(timestamp) {
        const difference = Date.now() - timestamp;
        const days = Math.floor(difference / (24 * 60 * 60 * 1000));
        return `${days} days ago`;
    }

    let progress = [0.24, 0.78, 0.67, 0.1, 0.37, 1.0];

    function progressValue(newValue) {
        progress = newValue;
    }

    function getColorClass(temp) {
        if (temp >= 0 && temp < 0.25) {
            return 'bg-red-500';
        } else if (temp >= 0.25 && temp < 0.5) {
            return 'bg-yellow-500';
        } else if (temp >= 0.5 && temp < 0.75) {
            return 'bg-green-500';
        } else {
            return 'bg-blue-500';
        }
    }

</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap justify-between my-2 items-center">
    <h2 class="">Prompts</h2>
    <a
        href={createRoute}
        class="btn variant-filled-secondary ml-">Add New</a
    >
</div>

<div class="flex flex-wrap gap-2 mx-auto mt-4">
    <input
        type="text"
        name="name"
        placeholder="Seacrch by name"
        class="input w-full lg:w-2/5"
    />
    <div class="w-full lg:w-1/4 flex sm:flex-row items-center gap-2 lg:ml-auto">
        <label
            for="documentType"
            class="block text-md">Group</label
        >
        <select
            id="documentType"
            name="documentType"
            class="input w-full ml-1"
        >
            <option>All</option>
            <option />
            <option />
        </select>
    </div>
    <div class="w-full lg:w-1/4 flex sm:flex-row items-center gap-2 lg:ml-auto">
        <label
            for="documentType"
            class="block text-md ">Source</label
        >
        <select
            id="documentType"
            name="documentType"
            class="input w-full"
        >
            <option>All</option>
            <option />
            <option />
        </select>
    </div>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
    <table
        class="table "
        role="grid"
    >
        <thead class="!variant-soft-secondary  ">
            <tr>
                <th>Id</th>
                <th>Prompt</th>
                <th>Display Id</th>
                <th>Version</th>
                <th>Model</th>
                <th>Group</th>
                <th>Active</th>
                <th>Last Updated</th>
                <th>Score</th>
                <th />
                <th />
                <th />
            </tr>
        </thead>
        <tbody class=" !bg-white dark:!bg-inherit ">
            {#each serialNumbers as serialNumber (serialNumber)}
                <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 ">
                    <td>{serialNumber}</td>
                    <td>{prompt[serialNumber - 1]}</td>
                    <td>{displayId[serialNumber - 1]}</td>
                    <td>{version[serialNumber - 1]}</td>
                    <td>{model[serialNumber - 1]}</td>
                    <td>{group[serialNumber - 1]}</td>
                    <td>
                        {#if activeStatus[serialNumber - 1]}
                            <span class="text-green-500">✔</span>
                        {:else}
                            <span class="text-red-500">✘</span>
                        {/if}</td
                    >
                    <td>{formatLastUpdated(lastUpdated[serialNumber - 1])}</td>
                    <td>
											<div class="flex flex-col items-center">
													<div style="font-size: 0.8em;">{progress[serialNumber - 1]}</div>
													<div class="h-2 w-full rounded-full bg-gray-200 mt-1">
															<div
																	class="{getColorClass(progress[serialNumber - 1])} h-full rounded-full transition-all duration-500 ease-in-out"
																	style="width: {progress[serialNumber - 1] * 100}%"
															></div>
													</div>
											</div>
									</td>
                    <td
                        ><button
                            ><Icon
                                icon="mdi-light:eye"
                                class="text-lg"
                            /></button
                        ></td
                    >
                    <td
                        ><button
                            ><Icon
                                icon="material-symbols:edit-outline"
                                class="text-lg"
                            /></button
                        ></td
                    >
                    <td
                        ><button
                            ><Icon
                                icon="material-symbols:delete-outline-rounded"
                                class="text-lg"
                            /></button
                        ></td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
    <Paginator
       
        buttonClasses=" text-primary-500"
        regionControl="bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200"
        controlVariant="rounded-full text-primary-500 "
        controlSeparator="fill-primary-400"
    />
</div>
