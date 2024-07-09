<script lang="ts">
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Confirm from '$lib/components/modal/confirmModal.svelte';
    import { Helper } from '$lib/utils/helper';
    import Icon from '@iconify/svelte';
    import { Paginator, type PaginationSettings, ProgressBar } from '@skeletonlabs/skeleton';
    import type { PageServerData } from './$types';

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;
    let retrivedGroups;
    $: groups = data.groups;

    const userId = $page.params.userId;
    const groupsRoute = `/users/${userId}/dev/prompts/groups`;
    const editRoute = (id) => `/users/${userId}/dev/prompts/groups/${id}/edit`;
    const viewRoute = (id) => `/users/${userId}/dev/prompts/groups/${id}/view`;
    const createRoute = `/users/${userId}/dev/prompts/groups/create`;

    const breadCrumbs = [{ name: 'Prompt Groups', path: groupsRoute }];

    let group = undefined;
    let sortBy = 'Group';
    let sortOrder = 'ascending';
    let itemsPerPage = 10;
    let offset = 0;
    let totalGroupsCount = data.groups.TotalCount;
    let isSortingGroup = false;
    let items = 10;

    let paginationSettings = {
        page: 0,
        limit: 10,
        size: totalGroupsCount,
        amounts: [10, 20, 30, 50]
    } satisfies PaginationSettings;

    async function searchGroups(model) {
        let url = `/api/server/groups/search?`;
        if (sortOrder) url += `sortOrder=${sortOrder}`;
        else url += `sortOrder=ascending`;
        if (sortBy) url += `&sortBy=${sortBy}`;
        if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
        if (offset) url += `&pageIndex=${offset}`;
        if (group) url += `&group=${group}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        });
        const response = await res.json();
        groups = response.map((item, index) => ({ ...item, index: index + 1 }));
    }

    $: {
        groups = groups.map((item, index) => ({ ...item, index: index + 1 }));
        paginationSettings.size = data.groups.TotalCount;
        retrivedGroups = groups.slice(
            paginationSettings.page * paginationSettings.limit,
            paginationSettings.page * paginationSettings.limit + paginationSettings.limit
        );
    }
    $: if (browser)
        searchGroups({
            group: group,
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

    function sortTable(columnGroup) {
        isSortingGroup = false;

        sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
        if (columnGroup === 'Group') {
            isSortingGroup = true;
        }
        sortBy = columnGroup;
    }

    const handleGroupsDelete = async (id) => {
        const groupsId = id;
        await Delete({
            sessionId: data.sessionId,
            groupsId
        });
        window.location.href = groupsRoute;
    };

    async function Delete(model) {
        const response = await fetch(`/api/server/groups`, {
            method: 'DELETE',
            body: JSON.stringify(model),
            headers: { 'content-type': 'application/json' }
        });
    }
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap justify-end my-2 items-center">
    <a
        href={createRoute}
        class="btn variant-filled-secondary">Add New</a
    >
</div>

<div class="flex flex-wrap w-2/5 gap-2 my-2 items-center">
    <input
        bind:value={group}
        type="text"
        name="group"
        placeholder="Search by group"
        class="input w-auto grow"
    />
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
    <table
        class="table "
        role="grid"
    >
        <thead class="!variant-soft-secondary  ">
            <!-- Table header -->
            <tr>
                <th>Id</th>
                <th>Group</th>
                <th>Display Id</th>
                <th>Last Updated</th>
                <th />
                <th />
                <th />
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit">
            {#if retrivedGroups.length <= 0}
                <tr>
                    <td colspan="6">No records found</td>
                </tr>
            {:else}
                {#each retrivedGroups as row}
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
                            {row.DisplayId !== null && row.DisplayId !== ''
                                ? Helper.truncateText(row.DisplayId, 40)
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
                                    on:click|preventDefault={() => confirmThis(handleGroupsDelete, row.id)}
                                    class="btn p-2 -my-1 hover:variant-soft-error"
                                >
                                    <Icon
                                        icon="material-symbols:delete-outline-rounded"
                                        class="text-lg"
                                    />
                                </button>
                                <span slot="title"> Delete </span>
                                <span slot="description"> Are you sure you want to delete a Prompt? </span>
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
