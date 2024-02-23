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

    let promptName = "LLM Prompt"
    const userId = $page.params.userId;
    const tenantRoute = `/users/${userId}/tenants`;
    const editRoute = (id) => `/users/${userId}/tenants/${id}/edit`;
    const viewRoute = (id) => `/users/${userId}/tenants/${id}/view`;
    const createRoute = `/users/${userId}/tenants/create`;

    const breadCrumbs = [{ name: `${promptName} Versions`, path: tenantRoute }];

    let serialNumbers = Array.from({ length: 6 }, (_, i) => i + 1);
    let group = [
        'Chat Default',
        'Content Generation',
        'Generic',
        'Miscellaneous',
        'Evaluation and Quality',
        'Chat Custom'
    ];
    let displayId = ['432425', '421115', '478445', '465224', '425861', '423532'];
    let version = ['v3', 'v1', 'v3', 'v1', 'v3', 'v1'];
    let comment = [
        'Initial version',
        'Updated role instructions',
        'Added personalization variable',
        'Stricter response instructions',
        'Spelling correction',
        'Ordering changes'
    ];
    let compareVersion = [];
    let lastUpdated = [
        Date.now() - 2 * 24 * 60 * 60 * 1000,
        Date.now() - 5 * 24 * 60 * 60 * 1000,
        Date.now() - 2 * 24 * 60 * 60 * 1000,
        Date.now() - 5 * 24 * 60 * 60 * 1000,
        Date.now() - 2 * 24 * 60 * 60 * 1000,
        Date.now() - 5 * 24 * 60 * 60 * 1000
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
                <th>Version Number</th>
                <th>Comments</th>
                <th>Compare Versions</th>
                <th>Last Updated</th>
                <th>Score</th>
                <th />
                <th />
                <th />
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
                    <td>{version[serialNumber - 1]}</td>
                    <td>{comment[serialNumber - 1]}</td>
                    <td>{compareVersion[serialNumber - 1]}</td>
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
