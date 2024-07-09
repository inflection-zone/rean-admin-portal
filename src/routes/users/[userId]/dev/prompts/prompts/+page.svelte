<script lang="ts">
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
    import type { PageServerData } from './$types';
    import { invalidate } from '$app/navigation';
    import { Helper } from '$lib/utils/helper';
    import Confirm from '$lib/components/modal/confirmModal.svelte';

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;

    let retrivedPrompts;
    $: prompts = data.prompts;

    const userId = $page.params.userId;
    const promptsRoute = `/users/${userId}/dev/prompts/prompts`;
    const editRoute = (id) => `/users/${userId}/dev/prompts/prompts/${id}/edit`;
    const viewRoute = (id) => `/users/${userId}/dev/prompts/prompts/${id}/view`;
    const createRoute = `/users/${userId}/dev/prompts/create`;

    const breadCrumbs = [{ name: 'Prompts', path: promptsRoute }];

    let name = undefined;
    let sortBy = 'Name';
    let sortOrder = 'ascending';
    let itemsPerPage = 10;
    let offset = 0;
    let totalPromptsCount = data.prompts.TotalCount;
    let isSortingName = false;
    let items = 10;

    let paginationSettings = {
        page: 0,
        limit: 10,
        size: totalPromptsCount,
        amounts: [10, 20, 30, 50]
    } satisfies PaginationSettings;

    async function searchPrompts(model) {
        let url = `/api/server/prompts/search?`;
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
        prompts = response.map((item, index) => ({ ...item, index: index + 1 }));
    }

    $: {
        prompts = prompts.map((item, index) => ({ ...item, index: index + 1 }));
        paginationSettings.size = data.prompts.TotalCount;
        retrivedPrompts = prompts.slice(
            paginationSettings.page * paginationSettings.limit,
            paginationSettings.page * paginationSettings.limit + paginationSettings.limit
        );
    }

    $: if (browser)
        searchPrompts({
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

    const handlePromptsDelete = async (id) => {
        const promptsId = id;
        await Delete({
            sessionId: data.sessionId,
            promptsId
        });
        invalidate('app:prompts');
    };

    async function Delete(model) {
        const response = await fetch(`/api/server/prompts`, {
            method: 'DELETE',
            body: JSON.stringify(model),
            headers: { 'content-type': 'application/json' }
        });
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

<div class="flex flex-wrap justify-end my-2 items-center">
    <a
        href={createRoute}
        class="btn variant-filled-secondary ml-">Add New</a
    >
</div>

<div class="flex flex-wrap gap-2 mx-auto mt-4">
    <input
        type="text"
        name="name"
        bind:value={name}
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
        <tbody class="!bg-white dark:!bg-inherit">
            {#if retrivedPrompts.length <= 0}
                <tr>
                    <td colspan="6">No records found</td>
                </tr>
            {:else}
                {#each retrivedPrompts as row}
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
                                {row.Prompt !== null && row.Prompt !== ''
                                    ? Helper.truncateText(row.Prompt, 20)
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
                            {row.Model !== null && row.Model !== ''
                                ? Helper.truncateText(row.Model, 40)
                                : 'Not specified'}
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={4}
                            tabindex="0"
                        >
                            {row.Group !== null && row.Group !== ''
                                ? Helper.truncateText(row.Group, 40)
                                : 'Not specified'}
                        </td>
                        <td
                            role="gridcell"
                            aria-colindex={4}
                            tabindex="0"
                        >
                            {#if row.IsActive !== null && row.IsActive !== ''}
                                {#if row.IsActive === true}
                                    <span class="text-green-500">✔</span>
                                {:else}
                                    <span class="text-red-500">✘</span>
                                {/if}
                            {:else}
                                Not specified
                            {/if}
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
                                    on:click|preventDefault={() => confirmThis(handlePromptsDelete, row.id)}
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
