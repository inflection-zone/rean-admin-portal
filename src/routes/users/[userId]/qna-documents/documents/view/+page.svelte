<script lang="ts">
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    //////////////////////////////////////////////////////////////////////////

    let name = 'Maternity-Pregnancy';
    let displayCode = '432435';
    let description = 'This Document contain all the information needed preganancy care and parental guidence.';
    let type = 'CSV';
    let version = '3';
    let fileName = 'maternity-pregnancy.csv';
    let source = 'Library';
    let parentDocument = 'maternity_faqs.csv';
    let parentVersion = 'v4';
    let active = 'Yes';
    let keywords = 'Neo Natal, Pregnancy, Nutrition';
    let storageKey = '';
    let chunkingStrategy = 'Recursive Strcture Aware Splitting';
    let chunkingLength = '400';
    let chunkingOverlap = '60';
    let splitter = '\n';
    let lastUpdated = '5 days ago';

    const userId = $page.params.userId;
    const tenantId = $page.params.id;
    const editRoute = `/users/${userId}/tenants/${tenantId}/edit`;
    const viewRoute = `/users/${userId}/tenants/${tenantId}/view`;
    const tenantRoute = `/users/${userId}/tenants`;
    const settingsRoute = `/users/${userId}/tenants/${tenantId}/settings`;
    const breadCrumbs = [
        {
            name: 'Tenants',
            path: tenantRoute
        },
        {
            name: 'View',
            path: viewRoute
        }
    ];
</script>

<!-- <BreadCrumbs crumbs={breadCrumbs} /> -->

<div class="flex w-full flex-wrap justify-end gap-2  my-2">
    <a
        href={editRoute}
        class="btn variant-filled-secondary"
    >
        <Icon icon="material-symbols:edit-outline " />
        <span>Edit</span>
    </a>
</div>
<div class="table-container my-2 border border-secondary-100 dark:border-surface-700 ">
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>View Document</th>
                <th class="text-end">
                    <a
                        href={tenantRoute}
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
                <td>Display Code</td>
                <td>{displayCode}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Description</td>
                <td>{description}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Type</td>
                <td>{type}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Version</td>
                <td>{version}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Filename</td>
                <td>
                    {fileName}
                    <button>
                        <a
                            href=""
                            class="btn variant-filled-secondary ml-16"
                        >
                            Open with Document Viewer</a
                        ></button
                    >
                </td>
            </tr>

            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Source</td>
                <td>{source}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Filename</td>
                <td>
                    {fileName}
                    <!-- <button
                    type="submit"
                    class="btn variant-filled-secondary ml-32">Open with Document Viewer</button> -->
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Parent Document</td>
                <td class="flex items-center ">
                    {parentDocument}
                    <button type="button">
                        <Icon
                            icon="mdi-light:eye"
                            class="text-lg ml-6 flex"
                        />
                    </button>
                </td>
            </tr>

            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Parent Version</td>
                <td>{parentVersion}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Active</td>
                <td>{active}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Keywords</td>
                <td>{keywords}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Storage Key / Url</td>
                <td>{storageKey}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Chunking Strategy</td>
                <td>{chunkingStrategy}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Chunking Length</td>
                <td>{chunkingLength}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Chunking Overlap</td>
                <td>{chunkingOverlap}</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Splitter</td>
                <td>\n</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Last Updated</td>
                <td>{lastUpdated}</td>
            </tr>
        </tbody>
    </table>
</div>
