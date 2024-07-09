<script lang="ts">
    import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Confirm from '$lib/components/modal/confirmModal.svelte';
    import { invalidate } from '$app/navigation';
    import type { PageServerData } from './$types';
    import { browser } from '$app/environment';
    import { Helper } from '$lib/utils/helper';

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;
    let retrivedTenantview;
    $:tenantview = data.tenantview.Items;

    const userId = $page.params.userId;
    const qnadocumentsRoute = `/users/${userId}/qna-documents/tenantview`; 
    const editRoute = (id) => `/users/${userId}/qna-documents/tenantview/${id}/edit`;
    const viewRoute = (id) => `/users/${userId}/qna-documents/tenantview/${id}/view`;
    const createRoute = `/users/${userId}/qna-documents/tenantview/create`;
   
    const breadCrumbs = [{ name: 'Documents', path: qnadocumentsRoute }];

    let name = undefined;
    let fileName = undefined;

    let sortBy = 'name';
    let sortOrder = 'ascending';
    let itemsPerPage = 10;
    let offset = 0;
    let totalTenantviewCount = data.tenantview.TotalCount;

    let isSortingName = false;
    let isSortingFileName = false;

    let items = 10;

    let paginationSettings = {
        page: 0,
        limit: 10,
        size: totalTenantviewCount,
        amounts: [10, 20, 30, 50]
    } satisfies PaginationSettings;

    async function searchTenantview(model) {
        let url = `/api/server/tenantview/search?`;
        if (sortOrder) url += `sortOrder=${sortOrder}`;
        else url += `sortOrder=ascending`;

        if (sortBy) url += `&sortBy=${sortBy}`;
        if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
        if (offset) url += `&pageIndex=${offset}`;
        if (name) url += `&name=${name}`;
        if (fileName) url += `&fileName=${fileName}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        });
        const response = await res.json();
        tenantview = response.map((item, index) => ({ ...item, index: index + 1 }));
    }

    $: {
        tenantview = tenantview.map((item, index) => ({ ...item, index: index + 1 }));
        paginationSettings.size = data.tenantview.TotalCount;
        retrivedTenantview = tenantview.slice(
            paginationSettings.page * paginationSettings.limit,
            paginationSettings.page * paginationSettings.limit + paginationSettings.limit
        );
    }
    $: if (browser)
        searchTenantview({
            name: name,
            fileName: fileName,
            itemsPerPage: itemsPerPage,
            pageIndex: offset,
            sortOrder: sortOrder,
            sortBy: sortBy
        });

    function onPageChange(e: CustomEvent): void {
        let pageIndex = e.detail;
        itemsPerPage = items * (pageIndex + 1);
    }

    function onAmountChange(e: CustomEvent): void {
        itemsPerPage = e.detail;
        items = itemsPerPage;
    }

    function sortTable(columnName) {
        isSortingName = false;
        isSortingFileName = false;
        sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
        if (columnName === 'Name') {
            isSortingName = true;
        } else if (columnName === 'FileName') {
            isSortingFileName = true;
        }
        sortBy = columnName;
    }

    const handleDocumentDelete = async (id) => {
        const tenantviewId = id;
        await Delete({
            sessionId: data.sessionId,
            tenantviewId
        });
        invalidate('app:tenantview');
    };

    async function Delete(model) {
        const response = await fetch(`/api/server/tenantview`, {
            method: 'DELETE',
            body: JSON.stringify(model),
            headers: { 'content-type': 'application/json' }
        });
    }
</script>

<BreadCrumbs crumbs={breadCrumbs} />
<div class="flex flex-wrap gap-2 mt-4  ">
    <input
        bind:value={name}
        type="text"
        name="name"
        placeholder="Search by Document name"
        class="input w-auto grow"
    />

    <input
        bind:value={fileName}
        type="text"
        name="fileName"
        placeholder="Search by Document fileName"
        class="input w-auto grow"
    />

    <a
        href={createRoute}
        class="btn variant-filled-secondary">Add New</a
    >
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
    <table
        class="table"
        role="grid"
    >
        <thead class="!variant-soft-secondary">
            <tr>
                <th data-sort="index">Id</th>
                <th>
                    <button on:click={() => sortTable('Name')}>
                        Name {isSortingName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
                    </button>
                </th>
                <th>
                    <button on:click={() => sortTable('FileName')}>
                        File Name {isSortingFileName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
                    </button>
                </th>
                <th>Version</th>
                <th>Parent Document</th>
                <th>Active</th>
                <th />
                <th />
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit">
            {#if retrivedTenantview.length <= 0}
                <tr>
                    <td colspan="6">No records found</td>
                </tr>
            {:else}
                {#each retrivedTenantview as row}
                    <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                        <td
                            role="gridcell"
                            aria-colindex={1}
                            tabindex="0">{row.index}</td
                        >
                        <td
                            role="gridcell"
                            aria-colindex={2}
                            tabindex="0"
                        >
                            <a href={viewRoute(row.id)}>
                                {row.Name !== null && row.Name !== ''
                                    ? Helper.truncateText(row.Name, 20)
                                    : 'Not specified'}
                            </a>
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={3}
                            tabindex="0"
                        >
                            {row.FileName !== null && row.FileName !== ''
                                ? Helper.truncateText(row.FileName, 40)
                                : 'Not specified'}
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={4}
                            tabindex="0"
                        >
                            {row.ParentDocumentVersion !== null && row.ParentDocumentVersion !== ''
                                ? Helper.truncateText(row.ParentDocumentVersion, 40)
                                : 'Not specified'}
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={5}
                            tabindex="0"
                        >
                            {row.ParentDocument !== null && row.ParentDocument !== ''
                                ? Helper.truncateText(row.ParentDocument, 40)
                                : 'Not specified'}
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={6}
                            tabindex="0"
                        >
                            {row.IsActive !== null && row.IsActive !== ''
                                ? Helper.truncateText(row.IsActive, 40)
                                : 'Not specified'}
                        </td>
                        <td>
							<a href={editRoute(row.id)} class="btn p-2 -my-1 hover:variant-soft-primary">
								<Icon icon="material-symbols:edit-outline" class="text-lg" />
							</a>
						</td>

                        <td>
                            <Confirm
                                confirmTitle="Delete"
                                cancelTitle="Cancel"
                                let:confirm={confirmThis}
                            >
                                <button
                                    on:click|preventDefault={() => confirmThis(handleDocumentDelete, row.id)}
                                    class="btn p-2 -my-1 hover:variant-soft-error"
                                >
                                    <Icon
                                        icon="material-symbols:delete-outline-rounded"
                                        class="text-lg"
                                    />
                                </button>
                                <span slot="title"> Delete </span>
                                <span slot="description"> Are you sure you want to delete a drug? </span>
                            </Confirm>
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
    <Paginator
        bind:settings={paginationSettings}
        on:page={onPageChange}
        on:amount={onAmountChange}
        buttonClasses=" text-primary-500"
        regionControl="bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200"
        controlVariant="rounded-full text-primary-500 "
        controlSeparator="fill-primary-400"
    />
</div>
