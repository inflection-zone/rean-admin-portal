<script lang="ts">
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';

    ////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;

    let versions = data.versions;

    let id = versions.id;
    let name = versions.Name;
    let description = versions.Description;
    let useCaseType = versions.UseCaseType;
    let group = versions.Group;
    let model = versions.Model;
    let prompt = versions.Prompt;
    let variable = versions.Variables;
    let temperature = versions.Temperature;
    let frequencyPenalty = versions.FrequencyPenalty;
    let topP = versions.TopP;
    let presencePenalty = versions.PresencePenalty;

    const userId = $page.params.userId;
    const editRoute = `/users/${userId}/dev/prompts/versions/${id}/edit`;
    const viewRoute = `/users/${userId}/dev/prompts/versions/${id}/view`;
    const versionsRoute = `/users/${userId}/dev/prompts/versions`;

    const breadCrumbs = [
        {
            name: 'Versions',
            path: versionsRoute
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
        href={versionsRoute}
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
                <th>View </th>
                <th class="text-end">
                    <a
                        href={versionsRoute}
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
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Version</td>
                <td>{useCaseType}</td>
            </tr>

            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Group</td>
                <td>{group}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Model</td>
                <td>{model}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Prompt</td>
                <td>{prompt}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Variable</td>
                <td>{variable}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Temperature</td>
                <td>{temperature}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Top P</td>
                <td>{topP}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Frequency Penalty</td>
                <td>{frequencyPenalty}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Presence Penalty</td>
                <td>{presencePenalty}</td>
            </tr>
        </tbody>
    </table>
</div>
