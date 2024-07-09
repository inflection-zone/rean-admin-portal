<script lang="ts">
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';

    ////////////////////////////////////////////////////////////////////////////////////
    export let data: PageServerData;
    let groups = data.groups;
    let id = groups.id;
    let name = groups.Name;
    let description = groups.Description;

    const userId = $page.params.userId;
    const editRoute = `/users/${userId}/dev/prompts/groups/${id}/edit`;
    const viewRoute = `/users/${userId}/dev/prompts/groups/${id}/view`;
    const groupsRoute = `/users/${userId}/dev/prompts/groups`;
    const versionRoute = `/users/${userId}/dev/prompts/versions`;

    const breadCrumbs = [
        {
            name: 'Groups',
            path: groupsRoute
        },
        {
            name: 'View',
            path: viewRoute
        }
    ];

    
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
    <a
        href={versionRoute}
        class="btn variant-outline-secondary ml-auto">Versions</a
    >
    <a
        href={editRoute}
        class="btn variant-filled-secondary"
    >
        <Icon icon="material-symbols:edit-outline" />
        <span>Edit</span>
    </a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>View</th>
                <th class="text-end">
                    <a
                        href={groupsRoute}
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
                <td>Name</td>
                <td>{name}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Description</td>
                <td>{description}</td>
            </tr>
          
        </tbody>
    </table>
</div>
