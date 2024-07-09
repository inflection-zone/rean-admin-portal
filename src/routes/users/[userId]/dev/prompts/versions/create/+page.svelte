<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';

    ////////////////////////////////////////////////////////////////////////////////

    let temperature = 0;
    let topP = 0;
    let frequency = 0;
    let presence = 0;

    let prompt = '';
    let variables = [];

    function updateVariables() {
        const regex = /\{(.*?)\}/g;
        let matches = [];
        let match;

        while ((match = regex.exec(prompt)) !== null) {
            matches.push(match[1]);
        }

        variables = matches;
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

    export let form;
    const userId = $page.params.userId;
    const createRoute = `/users/${userId}/dev/prompts/versions/create`;
    const versionsRoute = `/users/${userId}/dev/prompts/versions`;

    const breadCrumbs = [
        { name: 'Versions', path: versionsRoute },
        { name: 'Create', path: createRoute }
    ];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
    method="post"
    action="?/createVersionsAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
    use:enhance
>
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>Create Version</th>
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
                <td>Name *</td>
                <td>
                    <input
                        type="text"
                        name="name"
                        required
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
                        required
                        placeholder="Enter description here..."
                        class="input"
                    />
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Version</td>
                <td>1</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Use Case Type *</td>
                <td>
                    <select
                        class="select w-full"
                        required
                        name="useCaseType"
                        placeholder="Select type here..."
                    >
                        <option>Chat</option>
                        <option>Classification</option>
                        <option>Extraction</option>
                        <option>Ideation</option>
                        <option>Summarization</option>
                        <option>Generation</option>
                    </select>
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Group *</td>
                <td>
                    <select
                        class="select w-full"
                        required
                        name="group"
                        placeholder="Select type here..."
                    >
                        <option>Chat Default</option>
                        <option />
                        <option />
                        <option />
                        <option />
                        <option />
                    </select>
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Model *</td>
                <td>
                    <select
                        class="select w-full"
                        required
                        name="model"
                        placeholder="Select type here..."
                    >
                        <option>OpenAi GPT 3.5 Turbo</option>
                        <option />
                        <option />
                        <option />
                        <option />
                        <option />
                    </select>
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Prompt *</td>
                <td>
                    <textarea
                        name="prompt"
                        bind:value={prompt}
                        required
                        placeholder="Enter prompt here..."
                        class="input"
                        on:input={updateVariables}
                    />
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Variables</td>
                <td class="">
                    <div class="variables-container">
                        <textarea
                            name="variable"
                            bind:value={variables}
                            class="input"
                            on:input={updateVariables}
                        />
                    </div>
                </td>
            </tr>

            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 gap-20">
                <td class="py-4">Temperature</td>
                <td class="py-4">
                    <div class="flex items-center space-x-4">
                        <div class="w-64 relative">
                            <div
                                class="h-2 absolute rounded-full left-0 top-2 bottom-0 {getColorClass(temperature)}"
                                style="width: {temperature * 100}%"
                            />
                            <input
                                name="temperature"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                bind:value={temperature}
                            />
                            <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                                {temperature}
                            </span>
                        </div>
                        <div class="flex items-center gap-20 space-x-4">
                            <td class="py-4">Top P</td>
                            <div class="w-64 relative">
                                <div class="">
                                    <div
                                        class="h-2 absolute rounded-full left-0 top-2 bottom-0 {getColorClass(topP)}"
                                        style="width: {topP * 100}%"
                                    />
                                    <input
                                        name="topP"
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                        bind:value={topP}
                                    />
                                    <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                                        {topP}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div></td
                >
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 gap-20">
                <td class="py-4">Frequency Penalty</td>
                <td class="py-4">
                    <div class="flex items-center space-x-4">
                        <div class="w-64 relative">
                            <div
                                class="h-2 absolute rounded-full left-0 top-2 bottom-0 {getColorClass(frequency)}"
                                style="width: {frequency * 100}%"
                            />
                            <input
                                name="frequencyPenalty"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                bind:value={frequency}
                            />
                            <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                                {frequency}
                            </span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <td class="py-4">Presence Penalty</td>
                            <div class="w-64 relative">
                                <div
                                    class="h-2 absolute rounded-full left-0 top-2 bottom-0 {getColorClass(presence)}"
                                    style="width: {presence * 100}%"
                                />
                                <input
                                    name="presencePenalty"
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                    bind:value={presence}
                                />
                                <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                                    {presence}
                                </span>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="flex flex-wrap p-2 justify-end gap-2">
        <button class="btn variant-filled-secondary">Test</button>
        <button
            type="submit"
            name="action"
            value="save"
            class="btn variant-filled-secondary">Save</button
        >
        
        <button
            type="submit"
            class="btn variant-filled-secondary">Publish</button
        >
    </div>
</form>
