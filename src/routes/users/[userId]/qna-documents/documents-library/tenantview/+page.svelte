<script>
    import { Paginator } from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';

    // Data arrays
    let serialNumbers = Array.from({ length: 6 }, (_, i) => i + 1);
    let documentNames = ['Maternity', 'Diabetes', 'HIV', 'Heart Failure', 'Nutrition', 'Cholesterol'];
    let displayIds = ['432425', '421115', '478445', '465224', '425861', '423532'];
    let types = ['JSON', 'CSV', 'PDF', 'JSON', 'PDF', 'JSON'];
    let versions = ['v3', 'v2', 'v1', 'v4', 'v6', 'v5'];

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

    function addToCollection(serialNumber) {
        documentsAdded[serialNumber - 1] = true;
    }

    let documentsAdded = Array(serialNumbers.length).fill(false);
</script>

<div class="text-center my-8 text-secondary-500 text-3xl ">
    <h1>Default Document Library - Tenant View</h1>
</div>

<div class="lg:flex lg:flex-wrap lg:gap-6 mt-2">
    <div class="lg:w-full lg:flex lg:items-center lg:justify-between ml-3 ">
        <h2 class="text-2xl mx-auto lg:ml-0">Documents Library</h2>
        <div class="mt-2 lg:mt-0 lg:ml-auto lg:mr-0 flex flex-wrap gap-4">
            <a
                href=""
                class="btn variant-filled-secondary">Add New</a
            >
        </div>
    </div>
</div>

<div class="flex flex-wrap gap-2 mt-4 ">
    <input
        type="text"
        name="name"
        placeholder="Search by name"
        class="input w-full lg:w-2/5 ml-3"
    />
    <div class="w-full lg:w-1/4 flex  sm:flex-row items-center gap-2 lg:ml-auto">
        <label
            for="documentType"
            class="block text-md  ml-3 ">Type</label
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

<div class="table-container m-2 !border !border-secondary-100 dark:!border-surface-700  mt-4">
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
                <th>Last Updated</th>
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
                    <td>{formatLastUpdated(lastUpdatedTimestamps[serialNumber - 1])}</td>

                    <td
                        ><button
                            ><Icon
                                icon="mdi-light:eye"
                                class="text-lg"
                            /></button
                        ></td
                    >
                    <td />

                    <td>
                        {#if documentsAdded[serialNumber - 1]}
                            <span class="flex items-center">
                                <Icon
                                    icon="mdi-light:check"
                                    class="text-lg  text-primary-500 mr-1"
                                />
                                Added
                            </span>
                        {:else}
                            <button
                                type="button"
                                class="btn variant-ghost-warning py-1  text-sm"
                                on:click={() => addToCollection(serialNumber)}>Add to collection</button
                            >
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<div class="w-full ml-2 variant-soft-secondary rounded-lg p-2 ">
    <Paginator
        buttonClasses="text-primary-500"
        regionControl="bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200"
        controlVariant="rounded-full text-primary-500"
        controlSeparator="fill-primary-400"
    />
</div>
