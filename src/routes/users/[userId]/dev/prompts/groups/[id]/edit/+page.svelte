<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types.js';

    ////////////////////////////////////////////////////////////////////////////////
    export let data: PageServerData;
    let groups = data.groups;
    let id = groups.id;
    let name = groups.Name;
    let description = groups.Description;

    export let form;
    const userId = $page.params.userId;
    const createRoute = `/users/${userId}/dev/prompts/groups/create`;
    const groupRoutes = `/users/${userId}/dev/prompts/groups`;

    const breadCrumbs = [
        { name: 'Groups', path: groupRoutes },
        { name: 'Edit', path: createRoute }
    ];

    let _name = name;
    let _description = description;

    function handleReset() {
        name = _name;
        description = _description;
    }
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
    method="post"
    action="?/updateGroupsAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
    use:enhance
>
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>Edit Group</th>
                <th class="text-end">
                    <a
                        href={groupRoutes}
                        class="btn p-2 -my-2 variant-soft-secondary"
                    >
                        <Icon
                            icon="material-symbols:close-rounded"
                            class="text-lg"
                        />
                    </a>
                </th>
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit">
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Name *</td>
                <td>
                    <input
                        type="text"
                        name="title"
                        bind:value={name}
                        placeholder="Enter name here..."
                        class="input w-full {form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.title}
                        <p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
                    {/if}
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Description *</td>
                <td>
                    <textarea
                        name="description"
                        placeholder="Enter description here..."
                        bind:value={description}
                        class="input"
                    />
                </td>
            </tr>
        </tbody>
    </table>
    <div class="flex flex-wrap p-2 justify-end gap-2">
        <button
            type="button"
            on:click={handleReset}
            class="btn variant-soft-secondary">Reset</button
        >
        <button
            type="submit"
            class="btn variant-filled-secondary">Submit</button
        >
    </div>
</form>
