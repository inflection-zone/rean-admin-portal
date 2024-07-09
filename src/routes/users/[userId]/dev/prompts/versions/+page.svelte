<script lang="ts">
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Confirm from '$lib/components/modal/confirmModal.svelte';
    import { Helper } from '$lib/utils/helper';
    import Icon from '@iconify/svelte';
    import { Paginator, type PaginationSettings, ProgressBar } from '@skeletonlabs/skeleton';
    import type { PageServerData } from './$types';
    import { invalidate } from '$app/navigation';

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;

    let retrivedVersions;
    $: versions = data.versions;

    const userId = $page.params.userId;
    const versionsRoute = `/users/${userId}/dev/prompts/versions`;
    const editRoute = (id) => `/users/${userId}/dev/prompts/versions/${id}/edit`;
    const viewRoute = (id) => `/users/${userId}/dev/prompts/versions/${id}/view`;
    // const createRoute = `/users/${userId}/dev/prompts/create`;

    const breadCrumbs = [{ name: 'Versions', path: versionsRoute }];

    let name = undefined;
    let sortBy = 'Name';
    let sortOrder = 'ascending';
    let itemsPerPage = 10;
    let offset = 0;
    let totalVersionsCount = data.versions.TotalCount;
    let isSortingName = false;
    let items = 10;

    let paginationSettings = {
        page: 0,
        limit: 10,
        size: totalVersionsCount,
        amounts: [10, 20, 30, 50]
    } satisfies PaginationSettings;

    async function searchVersions(model) {
        let url = `/api/server/versions/search?`;
        if (sortOrder) url += `sortOrder=${sortOrder}`;
        else url += `sortOrder=ascending`;
        if (sortBy) url += `&sortBy=${sortBy}`;
        if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
        if (offset) url += `&pageIndex=${offset}`;
        if (name) url += `&name=${name}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        });
        const response = await res.json();
        versions = response.map((item, index) => ({ ...item, index: index + 1 }));
    }

    $: {
        versions = versions.map((item, index) => ({ ...item, index: index + 1 }));
        paginationSettings.size = data.versions.TotalCount;
        retrivedVersions = versions.slice(
            paginationSettings.page * paginationSettings.limit,
            paginationSettings.page * paginationSettings.limit + paginationSettings.limit
        );
    }

    $: if (browser)
        searchVersions({
            name: name,
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

        sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
        if (columnName === 'Name') {
            isSortingName = true;
        }
        sortBy = columnName;
    }

    const handleVersionsDelete = async (id) => {
        const versionsId = id;
        await Delete({
            sessionId: data.sessionId,
            versionsId
        });
        invalidate('app:versions');
    };

    async function Delete(model) {
        const response = await fetch(`/api/server/versions`, {
            method: 'DELETE',
            body: JSON.stringify(model),
            headers: { 'content-type': 'application/json' }
        });
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

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
    <table
        class="table "
        role="grid"
    >
        <thead class="!variant-soft-secondary  ">
            <!-- Table header -->
            <tr>
                <th>Id</th>
                <th>Version</th>
                <th>Display Id</th>
                <th>Version</th>
                <th>Comments</th>
                <th>Compare Versions</th>
                <th>Last Updated</th>
                <th>Score</th>
                <th />
                <th />
                <th />
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit">
            {#if retrivedVersions.length <= 0}
                <tr>
                    <td colspan="6">No records found</td>
                </tr>
            {:else}
                {#each retrivedVersions as row}
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
                                {row.Group !== null && row.Group !== ''
                                    ? Helper.truncateText(row.Group, 20)
                                    : 'Not specified'}
                            </a>
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={3}
                            tabindex="0"
                        >
                            {row.DisplayId !== null && row.DisplayId !== ''
                                ? Helper.truncateText(row.DisplayId, 40)
                                : 'Not specified'}
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={4}
                            tabindex="0"
                        >
                            {row.Version !== null && row.Version !== ''
                                ? Helper.truncateText(row.Version, 40)
                                : 'Not specified'}
                        </td>

                        <td
                            role="gridcell"
                            aria-colindex={4}
                            tabindex="0"
                        >
                            {row.Comments !== null && row.Comments !== ''
                                ? Helper.truncateText(row.Comments, 40)
                                : 'Not specified'}
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={4}
                            tabindex="0"
                        >
                            {row.CompareVersions !== null && row.CompareVersions !== ''
                                ? Helper.truncateText(row.CompareVersions, 40)
                                : 'Not specified'}
                        </td>

                        <td
                            role="gridcell"
                            aria-colindex={4}
                            tabindex="0"
                        >
                            {row.LastUpdated !== null && row.LastUpdated !== ''
                                ? Helper.truncateText(row.LastUpdated, 40)
                                : 'Not specified'}
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={4}
                            tabindex="0"
                        >
                            {row.Score !== null && row.Score !== ''
                                ? Helper.truncateText(row.Score, 40)
                                : 'Not specified'}
                        </td>
                        <td>
                            <a
                                href={viewRoute(row.id)}
                                class="btn p-2 -my-1 hover:variant-soft-primary"
                            >
                                <Icon
                                    icon="mdi-light:eye"
                                    class="text-lg"
                                />
                            </a>
                        </td>
                        <td>
                            <a
                                href={editRoute(row.id)}
                                class="btn p-2 -my-1 hover:variant-soft-primary"
                            >
                                <Icon
                                    icon="material-symbols:edit-outline"
                                    class="text-lg"
                                />
                            </a>
                        </td>
                        <td>
                            <Confirm
                                confirmTitle="Delete"
                                cancelTitle="Cancel"
                                let:confirm={confirmThis}
                            >
                                <button
                                    on:click|preventDefault={() => confirmThis(handleVersionsDelete, row.id)}
                                    class="btn p-2 -my-1 hover:variant-soft-error"
                                >
                                    <Icon
                                        icon="material-symbols:delete-outline-rounded"
                                        class="text-lg"
                                    />
                                </button>
                                <span slot="title"> Delete </span>
                                <span slot="description"> Are you sure you want to delete a Version? </span>
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
