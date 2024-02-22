<script>
    import { Paginator } from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let serialNumbers = Array.from({ length: 6 }, (_, i) => i + 1);
    let documentNames = ['Maternity', 'Diabetes', 'HIV', 'Heart Failure', 'Nutrition', 'Cholesterol'];
    let displayIds = ['432425', '421115', '478445', '465224', '425861', '423532'];
    let types = ['JSON', 'CSV', 'PDF', 'JSON', 'PDF', 'JSON'];
    let versions = ['v3', 'v2', 'v1', 'v4', 'v6', 'v5'];
    let parentDocumentLink = 'https://example.com/shared-link'; //temp link
    let activeStatus = [true, false, true, false, true, false];
    let lastUpdatedTimestamps = [
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
</script>

<div class="text-center my-8 text-secondary-500 text-3xl">
    <h1>Tenant Document Manager - Tenant View</h1>
</div>
<div class="lg:flex lg:flex-wrap lg:gap-6 mt-2  ml-3">
    <div class="lg:w-full lg:flex lg:items-center lg:justify-between">
        <h2 class="text-2xl mx-auto lg:ml-0">QnA Documents</h2>
        <div class="mt-2 lg:mt-0 lg:ml-auto lg:mr-0 flex flex-wrap gap-4">
            <button>
                <a
                    href=""
                    class="btn variant-filled-secondary">Explore Document Library</a
                ></button
            >
            <button>
                <a
                    href=""
                    class="btn variant-filled-secondary">Add New</a
                ></button
            >
        </div>
    </div>
</div>

<div class="flex flex-wrap gap-2 mt-4 ml-3 ">
    <input
        type="text"
        name="name"
        placeholder="Search by name"
        class="input w-full lg:w-2/5"
    />
    <div class="w-full lg:w-1/4 flex  sm:flex-row items-center gap-2 lg:ml-auto">
        <label
            for="documentType"
            class="block text-md  ml-4 ">Type</label
        >
        <select
            id="documentType"
            name="documentType"
            class="input w-full"
        >
            <option />
            <option />
            <option />
        </select>
    </div>
    <div class="w-full lg:w-1/4 flex   sm:flex-row items-center gap-2 lg:ml-auto">
        <label
            for="documentType"
            class="block text-md ">Source</label
        >
        <select
            id="documentType"
            name="documentType"
            class="input w-full"
        >
            <option />
            <option />
            <option />
        </select>
    </div>
</div>

<div class="table-container m-2 !border !border-secondary-100 dark:!border-surface-700 mt-4">
    <table
        class="table "
        role="grid"
    >
        <thead class="!variant-soft-secondary  ">
            <tr>
                <th>Sr no</th>
                <th>Document</th>
                <th>Display Id</th>
                <th>Type</th>
                <th>Version</th>
                <th>Parent <br /> Document</th>
                <th>Active</th>
                <th>Last Updated</th>
                <th>Source</th>
                <th />
                <th />
                <th />
            </tr>
        </thead>
        <tbody class=" !bg-white dark:!bg-inherit ">
            {#each serialNumbers as serialNumber (serialNumber)}
                <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 ">
                    <td>{serialNumber}</td>

                    <td>{documentNames[serialNumber - 1]}</td>
                    <td>{displayIds[serialNumber - 1]}</td>
                    <td>{types[serialNumber - 1]}</td>
                    <td>{versions[serialNumber - 1]}</td>
                    <td
                        ><a
                            href={parentDocumentLink}
                            target="_blank">link</a
                        ></td
                    >
                    <td>{activeStatus[serialNumber - 1] ? '✔️' : '❌'}</td>
                    <td>{formatLastUpdated(lastUpdatedTimestamps[serialNumber - 1])}</td>
                    <td>Library</td>

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

<div class="w-full variant-soft-secondary rounded-lg p-2 ml-2">
    <Paginator
        buttonClasses="text-primary-500"
        regionControl="bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200"
        controlVariant="rounded-full text-primary-500"
        controlSeparator="fill-primary-400"
    />
</div>
